import { Form, Formik } from 'formik'
import s from './profileDataForm.module.scss'
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import cn from 'classnames'


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


const ProfileDataForm = ({ profile: { fullName, lookingForAJob, lookingForAJobDescription, aboutMe, contacts }, userID, saveProfileTC,
   setEditMode, contactsErrors }) => {

   const [errorsList, setErrors] = useState([]);

   useEffect(() => {
      setErrors(contactsErrors);
   }, [contactsErrors]);
 
   let initialValues = {
      fullName: fullName,
      lookingForAJob: lookingForAJob,
      lookingForAJobDescription: lookingForAJobDescription,
      aboutMe: aboutMe,
      contacts: {
         facebook: contacts.facebook,
         website: contacts.website,
         vk: contacts.vk,
         twitter: contacts.twitter,
         instagram: contacts.instagram,
         youtube: contacts.youtube,
         github: contacts.github,
         mainLink: contacts.mainLink
      }
   }

   // const contactError = {
   //    facebook: 'Error message for Facebook',
   //    website: 'Error message for Website',
   //    vk: 'Error message for VK',
   //    twitter: 'Error message for Twitter',
   //    instagram: 'Error message for Instagram',
   //    youtube: 'Error message for Youtube',
   //    github: 'Error message for Github',
   //    mainLink: 'Error message for Main Link',
   // }

   const handleSubmit = async (values) => {
      await saveProfileTC(values, userID);
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
                           <textarea className={s.description} name='aboutMe' type='text' onChange={handleChange} value={values.aboutMe} />
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
                           <textarea className={s.description} name='lookingForAJobDescription' type='text' onChange={handleChange} value={values.lookingForAJobDescription} />
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
                           {/* {Object.keys(contacts).map(key => {
                              return <div key={key} className={s.contact}>
                                 <span>{key}:</span>
                                 <input name={"contacts." + key} type='text' onChange={handleChange} value={values.contacts[key]} />
                                 {errorsList.includes(key) && <p className={s.error}>error message</p>}
                              </div>
                           })} */}
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