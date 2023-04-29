import { ThunkAction } from "redux-thunk";
import { getUser, ResultCode, updateStatusOfUser } from "../API/api"
import { getStatusOfUser, saveProfile } from '../API/api';
import { ProfileType } from "./authReducer";
import { PhotosType } from "./authReducer";
import { AppStateType } from "./redux";
import Nullable from './nullable'


let initialState = {
   profile: {
      photos: {
         small: null as Nullable<string>,
         large: null as Nullable<string>
      },
      contacts: {
         facebook: null as Nullable<string>,
         website: null as Nullable<string>,
         vk: null as Nullable<string>,
         twitter: null as Nullable<string>,
         instagram: null as Nullable<string>,
         youtube: null as Nullable<string>,
         github: null as Nullable<string>,
         mainLink: null as Nullable<string>,
      },
      userId: null as Nullable<number>,
      lookingForAJob: false,
      lookingForAJobDescription: null as Nullable<string>,
      fullName: null as Nullable<string>,
      aboutMe: null as Nullable<string>,
   },
   status: '',
   isLoading: false,
   contactsErrors: [] as Array<string>
}

type StateType = typeof initialState

type ActionsTypes = ReturnType<typeof setUserProfileAC> |
   ReturnType<typeof setStatusOfUserAC> |
   ReturnType<typeof setIsLoadingAC> |
   ReturnType<typeof setProfilePhotosAC> |
   ReturnType<typeof setErrorAC> |
   ReturnType<typeof setNullErrorAC>

const profileReducer = (state: StateType = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case 'profile/SET_USER':
         return {
            ...state,
            profile: action.profile
         }
      case 'profile/SET_STATUS':
         return {
            ...state,
            status: action.status
         }
      case 'profile/IS_LOADING':
         return {
            ...state,
            isLoading: action.isLoading
         }
      case 'profile/SET_PHOTOS':
         return {
            ...state,
            profile: { ...state.profile, photos: action.photos }
         }
      case 'profile/SET_ERROR':
         const errorMessages: string[] = action.error;
         const fieldNames = errorMessages.reduce<string[]>((acc, errorMessage) => {
            const match = errorMessage.match(/\(([^)]+)\)/);
            if (match) {
               const fieldName = match[1].split('->')[1];
               if (fieldName) {
                  acc.push(fieldName.charAt(0).toUpperCase() + fieldName.slice(1));
               }
            }
            return acc;
         }, []);
         return {
            ...state,
            contactsErrors: fieldNames
         }
      case 'profile/NULL_ERROR':
         return {
            ...state,
            contactsErrors: []
         }
      default:
         return state
   }
}

///////////////////////////////////////////////////////////////////
export const setUserProfileAC = (profile: ProfileType) => ({ type: 'profile/SET_USER', profile } as const)
export const setStatusOfUserAC = (status: string) => ({ type: 'profile/SET_STATUS', status } as const)
export const setIsLoadingAC = (isLoading: boolean) => ({ type: 'profile/IS_LOADING', isLoading } as const)
export const setProfilePhotosAC = (photos: PhotosType) => ({ type: 'profile/SET_PHOTOS', photos } as const)
export const setErrorAC = (error: string[]) => ({ type: 'profile/SET_ERROR', error } as const)
export const setNullErrorAC = () => ({ type: 'profile/NULL_ERROR' } as const)
//////////////////////////////////////////////////////////////////////////////////

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfileTC = (userID: number): ThunkType => async (dispatch) => {
   let response = await getUser(userID)
   dispatch(setUserProfileAC(response))
}

export const getStatusOfUserTC = (id: number): ThunkType => async (dispatch) => {
   const response = await getStatusOfUser(id)
   dispatch(setStatusOfUserAC(response))
}

export const updataStatusOfUserTC = (status: string): ThunkType => async (dispatch) => {
   dispatch(setIsLoadingAC(true))
   const response = await updateStatusOfUser(status)
   if (response.resultCode === ResultCode.Success) {
      dispatch(setStatusOfUserAC(status))
      dispatch(setIsLoadingAC(false))
   }
}

export const saveProfileTC = (profile: ProfileType, userID: number): ThunkType => async (dispatch) => {
   dispatch(setIsLoadingAC(true))
   dispatch(setNullErrorAC())
   let response = await saveProfile(profile)
   if (response.resultCode == ResultCode.Success) {
      dispatch(getUserProfileTC(userID))
      dispatch(setIsLoadingAC(false))
   } else {
      dispatch(setErrorAC(response.messages))
      dispatch(setIsLoadingAC(false))
      return Promise.reject()
   }
}


export default profileReducer