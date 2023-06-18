import s from './profileStatus.module.scss';
import React, { useEffect, useState } from 'react';
import Preloader from '../../other/preloader/preloader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus } from '../../../redux/profile_selectors ';
import { updataStatusOfUserTC } from '../../../redux/profileReducer';
import { ThunkAuthType } from '../../../redux/authReducer';
import { AnyAction } from 'redux';
import { Form, Formik, FormikValues } from 'formik';
import { updateStatusOfUser } from './../../../API/api';

// type ProfileStatusType = {
//    isLoading: boolean
// }

// const ProfileStatus: React.FC<ProfileStatusType> = (props) => {

//    const userStatus = useSelector(getStatus)

//    const dispatch = useDispatch()

//    const updataStatusOfUser = (status: string) => {
//       const action = updataStatusOfUserTC(status)
//       dispatch(action as ThunkAuthType & AnyAction)
//    }

//    let { userID } = useParams()

//    let [editMode, setEditMode] = useState(false)
//    let [status, setStatus] = useState(userStatus)

//    useEffect(() => {
//       setStatus(userStatus)
//    }, [userStatus])


//    const activateEditMode = () => {
//       setEditMode(true)
//    }

//    const deactivateEditMode = () => {
//       setEditMode(false)
//       updataStatusOfUserTC(status ?? '')
//    }

//    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setStatus(e.currentTarget.value)
//    }

//    if (props.isLoading) {
//       return <Preloader />
//    }

//    if (userID !== undefined) {
//       return (
//          <div className={s.status}>
//             <div className={s.status_top}>
//                {/* <span>{props.status || 'No status'}</span> */}
//                <span>{status || 'No status'}</span>
//             </div>
//          </div>
//       )
//    }

//    return (
//       <div className={s.status}>
//          {!editMode ?
//             <div className={s.status_top}>
//                {/* <span onClick={activateEditMode}>{props.status || 'No status'}</span> */}
//                <span onClick={activateEditMode}>{status || 'No status'}</span>
//             </div> :
//             <div className={s.status_buttom}>
//                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status ?? ''} />
//             </div>
//          }
//       </div>
//    )
// }


// export default ProfileStatus;



type ProfileStatusType = {
   isLoading: boolean
}

const ProfileStatus: React.FC<ProfileStatusType> = (props) => {

   const userStatus = useSelector(getStatus)

   const dispatch = useDispatch()

   const updataStatusOfUser = (status: string) => {
      const action = updataStatusOfUserTC(status)
      dispatch(action as ThunkAuthType & AnyAction)
   }

   let { userID } = useParams()

   let [editMode, setEditMode] = useState(false)
   let [status, setStatus] = useState(userStatus)

   useEffect(() => {
      setStatus(userStatus)
   }, [userStatus])


   const activateEditMode = () => {
      setEditMode(true)
   }

   const handleSubmit = (values: FormikValues) => {
      setEditMode(false)
      updataStatusOfUser(values.status)
   };

   if (props.isLoading) {
      return <Preloader />
   }

   if (userID !== undefined) {
      return (
         <div className={s.status}>
            <div className={s.status_top}>
               <span>{status || 'No status'}</span>
            </div>
         </div>
      )
   }

   return (
      <div className={s.status}>
         {!editMode ?
            <div className={s.status_top}>
               <span onClick={activateEditMode}>{status || 'No status'}</span>
            </div> :
            <div className={s.status_buttom}>
               <Formik initialValues={{ status: userStatus }} onSubmit={handleSubmit} >
                  {
                     ({ values, handleChange }) => (
                        <Form className={s.form}>
                           <div className={s.form_login}>
                              <input name='status' type='text' onBlur={() => handleSubmit(values)} onChange={handleChange} autoFocus={true} value={values.status} />
                           </div>
                        </Form>
                     )
                  }
               </Formik>
            </div>
         }
      </div>
   )
}


export default ProfileStatus;

