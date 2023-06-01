import s from './login.module.scss'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, getCaptcha } from '../../redux/authSelector'
import { LogInTC, ThunkAuthType } from '../../redux/authReducer'
import { AnyAction } from 'redux'

const loginSchema = Yup.object().shape({
   password: Yup.string()
      .matches(/[a-zA-Zа-яА-ЯёЁ0-9]$/, 'forbidden symbols')
      .min(6, 'Login is too short')
      .max(16, 'Login is too long')
      .required('Please enter this field'),
   email: Yup.string()
      .email('Invalid email')
      .required('Please enter this field')
})


type LoginPropsType = {
   active: boolean
   setActive: (active: boolean) => void
}

const Login: React.FC<LoginPropsType> = ({ active, setActive }) => {

   const isAuth = useSelector(getAuth)
   const captcha = useSelector(getCaptcha)

   const dispatch = useDispatch()

   const logIn = (email: string, password: string, remember: boolean, captcha: string) => {
      const action = LogInTC(email, password, remember, captcha)
      dispatch(action as ThunkAuthType & AnyAction);
   }

   if (isAuth) {
      setActive(false)
   }

   const navigate = useNavigate()
   const location = useLocation()

   const fromPage = location.state || '/'


   useEffect(() => {
      if (isAuth) {
         navigate(fromPage);
         // navigate(-2);
      }
   }, [isAuth]);

   const handleSubmit = (values: FormikValues) => {
      logIn(values.email, values.password, values.remember, values.captcha);
   };


   return (
      <div className={active ? cn(s.login, s.login_active) : s.login} onClick={() => setActive(false)}>
         <div className={active ? cn(s.login_content, s.login_content_active) : s.login} onClick={e => e.stopPropagation()}>
            <Formik initialValues={{ password: '', email: '', remember: false, captcha: '' }} validationSchema={loginSchema} onSubmit={handleSubmit}>
               {
                  ({ values, errors, touched, handleChange }) => (
                     <Form className={s.form}>
                        <div className={s.form_login}>
                           <input name='password' type='text' onChange={handleChange} value={values.password} placeholder='password' />
                           <p>{errors.password && touched.password && errors.password}</p>
                        </div>
                        <div className={s.form_login}>
                           <input name='email' type='email' onChange={handleChange} value={values.email} placeholder='Email' />
                           <p>{errors.email && touched.email && errors.email}</p>
                        </div>
                        <div className={s.form_remember}>
                           <input name='remember' type='checkbox' onChange={handleChange} value={values.remember ? 'true' : 'false'} />
                           <p>remember me</p>
                        </div>
                        {captcha && <div className={s.captcha}>
                           <img src={captcha} />
                           <input name='captcha' type='text' onChange={handleChange} value={values.captcha} />
                        </div>}
                        <div className={s.form_submit}>
                           <button type='submit'>Login</button>
                        </div>
                     </Form>
                  )
               }
            </Formik>
         </div>
      </div>
   )
}
export default Login
