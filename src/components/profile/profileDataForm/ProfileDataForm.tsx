import { Form, Formik, FormikValues } from 'formik'
import s from './profileDataForm.module.scss'
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux';
import { saveProfileTC, StateProfileType } from '../../../redux/profileReducer';
import { ProfileType, ThunkAuthType } from '../../../redux/authReducer';
import { AnyAction } from 'redux';
import { getContactsErrors, getProfile } from '../../../redux/profile_selectors ';



const profileDataSchema = Yup.object().shape({
   fullName: Yup.string()
      .matches(/[a-zA-Zа-яА-ЯёЁ]$/, 'forbidden symbols')
      .min(2, 'full name is too short')
      .max(40, 'full name is too long')
      .required('Please enter this field'),
   description: Yup.string()
      .max(20, 'description is too long'),
   aboutMe: Yup.string()
      .max(100, 'description is too long'),
})


type ProfileDataFormType = {
   userID: number,
   setEditMode: (editMode: boolean) => void,
}

const ProfileDataForm: React.FC<ProfileDataFormType> = ({ userID, setEditMode }) => {

   const profile = useSelector(getProfile)
   const contactsErrors = useSelector(getContactsErrors)

   const dispatch = useDispatch()

   const saveProfile = (values: ProfileType, userID: number) => {
      const action = saveProfileTC(values, userID)
      dispatch(action as ThunkAuthType & AnyAction)
   }

   const [errorsList, setErrors] = useState([] as Array<string>);

   useEffect(() => {
      setErrors(contactsErrors);
   }, [contactsErrors]);

   let initialValues = {
      userId: userID,
      photos: profile.photos,
      fullName: profile.fullName ?? '',
      lookingForAJob: profile.lookingForAJob,
      lookingForAJobDescription: profile.lookingForAJobDescription ?? '',
      aboutMe: profile.aboutMe ?? '',
      contacts: {
         facebook: profile.contacts.facebook ?? '',
         website: profile.contacts.website ?? '',
         vk: profile.contacts.vk ?? '',
         twitter: profile.contacts.twitter ?? '',
         instagram: profile.contacts.instagram ?? '',
         youtube: profile.contacts.youtube ?? '',
         github: profile.contacts.github ?? '',
         mainLink: profile.contacts.mainLink ?? ''
      }
   }

   const handleSubmit = (values: ProfileType) => {
      saveProfile(values, userID);
      setEditMode(false)
   }

   return (
      <div className={s.formik}>
         <Formik initialValues={initialValues} validationSchema={profileDataSchema} onSubmit={handleSubmit} >
            {
               ({ values, errors, touched, handleChange }) => (
                  <Form className={s.form}>
                     <div className={s.fullName}>
                        <p className={s.text}>Full name:</p>
                        <div className={s.row}>
                           <input name='fullName' type='text' onChange={handleChange} value={values.fullName} />
                           <p className={s.error}>{errors.fullName && touched.fullName && errors.fullName}</p>
                        </div>
                     </div>
                     <div className={s.aboutMe}>
                        <p className={s.text}>About me:</p>
                        <div className={s.row}>
                           <textarea className={s.description} name='aboutMe' onChange={handleChange} value={values.aboutMe} />
                           <p className={s.error}>{errors.aboutMe && touched.aboutMe && errors.aboutMe}</p>
                        </div>
                     </div>
                     <div className={s.lookingForAJob}>
                        <p className={s.text}>looking for a job:</p>
                        <div className={s.row}>
                           <input className={s.checkbox} name='lookingForAJob' type='checkbox' onChange={handleChange} checked={values.lookingForAJob} />
                        </div>
                     </div>
                     <div className={s.lookingForAJobDescription}>
                        <p className={s.text}>My professional skills:</p>
                        <div className={s.row}>
                           <textarea className={s.description} name='lookingForAJobDescription' onChange={handleChange} value={values.lookingForAJobDescription} />
                           <p className={s.error}>{errors.lookingForAJobDescription && touched.lookingForAJobDescription && errors.lookingForAJobDescription}</p>
                        </div>
                     </div>
                     <div className={s.contacts}>
                        <p className={s.text}>Contacts:</p>
                        <div className={s.column}>
                           <div className={s.contact}>
                              <p className={s.header}>facebook:</p>
                              <input name='contacts.facebook' type='text' onChange={handleChange} value={values.contacts.facebook} />
                              {errorsList.includes('Facebook') && <p className={s.error}>Enter correct url</p>}
                           </div>
                           <div className={s.contact}>
                              <p className={s.header}>website:</p>
                              <input name='contacts.website' type='text' onChange={handleChange} value={values.contacts.website} />
                              {errorsList.includes('Website') && <p className={s.error}>Enter correct url</p>}
                           </div>
                           <div className={s.contact}>
                              <p className={s.header}>vk:</p>
                              <input name='contacts.vk' type='text' onChange={handleChange} value={values.contacts.vk} />
                              {errorsList.includes('Vk') && <p className={s.error}>Enter correct url</p>}
                           </div>
                           <div className={s.contact}>
                              <p className={s.header}>twitter:</p>
                              <input name='contacts.twitter' type='text' onChange={handleChange} value={values.contacts.twitter} />
                              {errorsList.includes('Twitter') && <p className={s.error}>Enter correct url</p>}
                           </div>
                           <div className={s.contact}>
                              <p className={s.header}>instagram:</p>
                              <input name='contacts.instagram' type='text' onChange={handleChange} value={values.contacts.instagram} />
                              {errorsList.includes('Instagram') && <p className={s.error}>Enter correct url</p>}
                           </div>
                           <div className={s.contact}>
                              <p className={s.header}>youtube:</p>
                              <input name='contacts.youtube' type='text' onChange={handleChange} value={values.contacts.youtube} />
                              {errorsList.includes('Youtube') && <p className={s.error}>Enter correct url</p>}
                           </div>
                           <div className={s.contact}>
                              <p className={s.header}>github:</p>
                              <input name='contacts.github' type='text' onChange={handleChange} value={values.contacts.github} />
                              {errorsList.includes('Github') && <p className={s.error}>Enter correct url</p>}
                           </div>
                           <div className={s.contact}>
                              <p className={s.header}>mainLink:</p>
                              <input name='contacts.mainLink' type='text' onChange={handleChange} value={values.contacts.mainLink} />
                              {errorsList.includes('MainLink') && <p className={s.error}>Enter correct url</p>}
                           </div>
                        </div>
                     </div>
                     <div className={s.submit}>
                        <button type='submit'>Submit</button>
                     </div>
                  </Form>
               )
            }
         </Formik>
      </div>
   )
}

export default ProfileDataForm


