import s from './Profile.module.scss'
import Preloader from './../other/preloader/preloader'
import ava from './../../img/ava.jpg'
import ProfileStatus from './profileStatus/ProfileStatus'
import { useState } from 'react'
import ProfileDataForm from './profileDataForm/ProfileDataForm'


const Profile = ({ profile, authorizedUserID, userID, savePhotoTC, isLoading, saveProfileTC, contactsErrors, ...props }) => {

   let [editMode, setEditMode] = useState(false)

   const goToEditMode = () => {
      setEditMode(true)
   }

   if (profile == null || profile == undefined || isLoading) {
      return <Preloader />
   }

   const onProfilePhotoSelected = (e) => {
      if (e.target.files.length) {
         savePhotoTC(e.target.files[0])
      }
   }

   return (
      <div className={s.content}>
         <div className={s.status}>
            <ProfileStatus {...props} />
         </div>
         <div className={s.info}>
            <img className={s.info_img} src={profile.photos.large ? profile.photos.large : ava} alt="#"></img>
            <div className={s.upload}>
               {userID == authorizedUserID && <input type='file' onChange={onProfilePhotoSelected} />}
            </div>
            {userID === authorizedUserID && editMode ?
               <ProfileDataForm profile={profile} userID={userID} saveProfileTC={saveProfileTC} setEditMode={setEditMode} contactsErrors={contactsErrors} /> :
               <ProfileData profile={profile} authorizedUserID={authorizedUserID} userID={userID} goToEditMode={goToEditMode} />}
         </div>
      </div>
   )
}

const ProfileData = ({ profile, userID, authorizedUserID, goToEditMode }) => {
   return (
      <div className={s.info_text}>
         <div className={s.info_fullName}>{profile.fullName}</div>
         <div className={s.info_row}>
            <span className={s.title}>About me:</span> {profile.aboutMe}
         </div>
         <div className={s.info_row}>
            <span className={s.title}>Looking for a job:</span> {profile.lookingForAJob ? <span>Yes</span> : <span>No</span>}
         </div>
         {profile.lookingForAJob &&
            <div className={s.info_row}>
               <span className={s.title}>Job description:</span>{profile.lookingForAJobDescription}
            </div>
         }
         <div className={s.info_row}>
            <span className={s.title}>Contacts:</span> {Object.keys(profile.contacts).map(key => {
               return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
         </div>
         {userID === authorizedUserID && <div className={s.button_owner}><button onClick={goToEditMode}>Edit</button></div>}
      </div>
   )
}

const Contacts = ({ contactTitle, contactValue }) => {
   return (
      <div className={s.contacts}>
         <div className={s.contact}>
            <span className={s.contact__title}>{contactTitle}:</span>
            <span className={s.value}>{contactValue}</span>
         </div>
      </div>
   )
}


export default Profile;

