import s from './login.module.scss'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

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


const Login = ({ active, setActive, isAuth, LogInTC }) => {

   if (isAuth) {
      setActive(false)
   }

   const navigate = useNavigate()
   const location = useLocation()
   const fromPage = location.state?.from?.pathname


   useEffect(() => {
      if (isAuth) {
         navigate(fromPage);
      }
   }, [isAuth]);

   const handleSubmit = (values) => {
      LogInTC(values.email, values.password, values.remember);
   };


   return (
      <div className={active ? `${s.login} ${s.login_active}` : s.login} onClick={() => setActive(false)}>
         <div className={active ? `${s.login_content} ${s.login_content_active}` : s.login} onClick={e => e.stopPropagation()}>
            <Formik initialValues={{ password: '', email: '', remember: false }} validationSchema={loginSchema} onSubmit={handleSubmit}>
               {
                  ({ values, errors, touched, handleChange }) => (
                     <Form className={s.form}>
                        <div className={s.form_login}>
                           <input name='password' type='text' onChange={handleChange} values={values.login} placeholder='password' />
                           <p>{errors.password && touched.password && errors.password}</p>
                        </div>
                        <div className={s.form_login}>
                           <input name='email' type='email' onChange={handleChange} values={values.email} placeholder='Email' />
                           <p>{errors.email && touched.email && errors.email}</p>
                        </div>
                        <div className={s.form_remember}>
                           <input name='remember' type='checkbox' onChange={handleChange} values={values.remember ? 'true' : 'false'} />
                           <p>remember me</p>
                        </div>
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
