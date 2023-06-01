import s from './Profile.module.scss'
import Preloader from '../other/preloader/preloader'
import ava from './../../img/ava.jpg'
import ProfileStatus from './profileStatus/ProfileStatus'
import { ChangeEvent, useEffect, useState } from 'react'
import ProfileDataForm from './profileDataForm/ProfileDataForm'
import { ProfileType, savePhotoTC, ThunkAuthType } from '../../redux/authReducer'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getAuthorizedUserID, getContactsErrors, getIsLoading, getProfile } from '../../redux/profile_selectors '
import { getStatusOfUserTC, getUserProfileTC } from '../../redux/profileReducer'
import { AnyAction, compose } from 'redux'
import { withAuthRedirect } from '../HOC/authRedirect'


const Profile: React.FC = (props) => {

   const authorizedUserID = useSelector(getAuthorizedUserID)
   const profile = useSelector(getProfile)
   const isLoading = useSelector(getIsLoading)
   const contactsErrors = useSelector(getContactsErrors)

   const dispatch = useDispatch()

   const savePhoto = (photos: File) => {
      const action = savePhotoTC(photos)
      dispatch(action as ThunkAuthType & AnyAction)
   }

   let { userID } = useParams<{ userID?: string }>()
   const parsedUserID = userID ? parseInt(userID) : authorizedUserID ?? 0;

   useEffect(() => {
      const action = getUserProfileTC(parsedUserID)
      dispatch(action as ThunkAuthType & AnyAction)
      const actionStatus = getStatusOfUserTC(parsedUserID)
      dispatch(actionStatus as ThunkAuthType & AnyAction)
   }, [userID])

   let [editMode, setEditMode] = useState<boolean>(false)

   const goToEditMode = () => {
      setEditMode(true)
   }

   if (profile == null || profile == undefined || isLoading) {
      return <Preloader />
   }

   const onProfilePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
      // if (e.target.files && e.target.files.length) {
      if (e.target.files?.length) {
         savePhotoTC(e.target.files[0])
      }
   }

   return (
      <div className={s.content}>
         <div className={s.status}>
            <ProfileStatus isLoading={isLoading} />
         </div>
         <div className={s.info}>
            <img className={s.info_img} src={profile.photos.large ? profile.photos.large : ava} alt="#"></img>
            <div className={s.upload}>
               {parsedUserID === authorizedUserID && <input type='file' onChange={onProfilePhotoSelected} />}
            </div>
            {parsedUserID === authorizedUserID && editMode ?
               <ProfileDataForm userID={parsedUserID} setEditMode={setEditMode} /> :
               <ProfileData profile={profile} authorizedUserID={authorizedUserID} userID={parsedUserID} goToEditMode={goToEditMode} />}
         </div>
      </div>
   )
}

type ProfileDataType = {
   profile: ProfileType;
   userID: number;
   authorizedUserID: number | null;
   goToEditMode: () => void;
};

const ProfileData: React.FC<ProfileDataType> = ({ profile, userID, authorizedUserID, goToEditMode }) => {
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
               return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key as keyof typeof profile.contacts]} />
            })}
         </div>
         {userID === authorizedUserID && <div className={s.button_owner}><button onClick={goToEditMode}>Edit</button></div>}
      </div>
   )
}

type ContactsType = {
   contactTitle: string
   contactValue: string | null
}

const Contacts: React.FC<ContactsType> = ({ contactTitle, contactValue }) => {
   return (
      <div className={s.contacts}>
         <div className={s.contact}>
            <span className={s.contact__title}>{contactTitle}:</span>
            <span className={s.value}>{contactValue}</span>
         </div>
      </div>
   )
}

// export default Profile;
export default compose(withAuthRedirect)(Profile)

