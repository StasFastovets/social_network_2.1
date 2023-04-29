import { connect } from 'react-redux';
import { withAuthRedirect } from '../HOC/authRedirect';
import { getUserProfileTC } from '../../redux/profileReducer';
import { useEffect } from 'react';
import Profile from './Profile';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { updataStatusOfUserTC } from '../../redux/profileReducer';
import { getStatusOfUserTC, saveProfileTC } from '../../redux/profileReducer';
import { getAuthorizedUserID, getIsAuth, getIsLoading, getProfile, getStatus } from '../../redux/profile_selectors ';
import { savePhotoTC } from '../../redux/authReducer';
import { ProfileType } from "../../redux/authReducer";
import { AppStateType } from '../../redux/redux';

type MapStatePropsType = {
   isAuth: boolean
   authorizedUserID: number | null
   profile: ProfileType
   status: string 
   isLoading: boolean
   contactsErrors: string[]
}

type MapDispatchPropsType = {
   getUserProfileTC: (userID: number) => void
   updataStatusOfUserTC: (status: string) => void
   getStatusOfUserTC: (userID: number) => void
   savePhotoTC: (photos: File) => void
   saveProfileTC: (values: ProfileType, userID: number) => void
}

type OwnPropsType = {}

type HookPropsType = {
   getUserProfileTC: (userID: number) => void;
   getStatusOfUserTC: (userID: number) => void;
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & HookPropsType


const ProfileAPIContainer: React.FC<PropsType> = (props) => {

   let { userID } = useParams<{ userID?: string }>()

   const parsedUserID = userID ? parseInt(userID) : props.authorizedUserID ?? 0;

   useEffect(() => {
      props.getUserProfileTC(parsedUserID)
      props.getStatusOfUserTC(parsedUserID)
   }, [userID])

   return (
      <Profile {...props} userID={parsedUserID} />
   )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
   return {
      isAuth: getIsAuth(state),
      authorizedUserID: getAuthorizedUserID(state),
      profile: getProfile(state),
      status: getStatus(state),
      isLoading: getIsLoading(state),
      contactsErrors: state.profile.contactsErrors
   }
}

// export default compose(connect(mapStateToProps,
//    { getUserProfileTC, updataStatusOfUserTC, getStatusOfUserTC, savePhotoTC }), withAuthRedirect)(ProfileAPIContainer)

const ProfileContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
   mapStateToProps, { getUserProfileTC, updataStatusOfUserTC, getStatusOfUserTC, savePhotoTC, saveProfileTC })(withAuthRedirect(ProfileAPIContainer))


export default ProfileContainer