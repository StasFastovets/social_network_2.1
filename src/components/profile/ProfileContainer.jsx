import { connect } from 'react-redux';
import { withAuthRedirect } from '../HOC/authRedirect';
import { getUserProfileTC } from './../../redux/profileReducer';
import { useEffect } from 'react';
import Profile from './Profile';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { updataStatusOfUserTC } from './../../redux/profileReducer';
import { getStatusOfUserTC } from './../../redux/profileReducer';
import { getAuthorizedUserID, getIsAuth, getIsLoading, getProfile, getStatus, getProfilePhoto } from '../../redux/profile_selectors ';
import { savePhotoTC } from '../../redux/authReducer';


const ProfileAPIContainer = (props) => {

   let { userID } = useParams()

   if (!userID) {
      userID = props.authorizedUserID
   }

   useEffect(() => {
      props.getUserProfileTC(userID)
      props.getStatusOfUserTC(userID)
   }, [userID])

   return (
      <Profile {...props} userID={userID} />
   )
}

let mapStateToProps = (state) => {
   return {
      isAuth: getIsAuth(state),
      authorizedUserID: getAuthorizedUserID(state),
      profile: getProfile(state),
      status: getStatus(state),
      isLoading: getIsLoading(state),
   }
}


export default compose(connect(mapStateToProps,
   { getUserProfileTC, updataStatusOfUserTC, getStatusOfUserTC, savePhotoTC }), withAuthRedirect)(ProfileAPIContainer)