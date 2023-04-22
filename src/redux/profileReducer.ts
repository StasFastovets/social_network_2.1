import { getUser, updateStatusOfUser } from "../API/api"
import { getStatusOfUser, saveProfile } from '../API/api';
import { InitialStateProfileType } from "./authReducer";

const SET_USER = 'profile/SET_USER'
const SET_STATUS = 'profile/SET_STATUS'
const IS_LOADING = 'profile/IS_LOADING'
const SET_PHOTOS = 'profile/SET_PHOTOS'
const SET_ERROR = 'profile/SET_ERROR'
const NULL_ERROR = 'profile/NULL_ERROR'

export type InitialStateType = {
   profile: InitialStateProfileType,
   status: string,
   isLoading: boolean,
   contactsErrors: string[]
}

let initialState: InitialStateType = {
   profile: {
      photos: {
         small: null,
         large: null
      },
      contacts: {
         facebook: null,
         website: null,
         vk: null,
         twitter: null,
         instagram: null,
         youtube: null,
         github: null,
         mainLink: null
      },
      userId: null,
      lookingForAJob: false,
      lookingForAJobDescription: null,
      fullName: null,
      aboutMe: null,
   },
   status: '',
   isLoading: false,
   contactsErrors: []
}

const profileReducer = (state = initialState, action: any): InitialStateType => {
   switch (action.type) {
      case SET_USER:
         return {
            ...state,
            profile: action.profile
         }
      case SET_STATUS:
         return {
            ...state,
            status: action.status
         }
      case IS_LOADING:
         return {
            ...state,
            isLoading: action.isLoading
         }
      case SET_PHOTOS:
         return {
            ...state,
            profile: { ...state.profile, photos: action.photos }
         }
      case SET_ERROR:
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
      case NULL_ERROR:
         return {
            ...state,
            contactsErrors: []
         }
      default:
         return state
   }
}

type SetUserProfileACType = {
   type: typeof SET_USER,
   profile: InitialStateProfileType | null
}
export const setUserProfileAC = (profile: InitialStateProfileType): SetUserProfileACType => ({ type: SET_USER, profile })

type SetStatusOfUserACType = {
   type: typeof SET_STATUS,
   status: string | null
}
export const setStatusOfUserAC = (status: string): SetStatusOfUserACType => ({ type: SET_STATUS, status })

type IsLoadingACType = {
   type: typeof IS_LOADING,
   isLoading: boolean
}
export const setIsLoadingAC = (isLoading: boolean): IsLoadingACType => ({ type: IS_LOADING, isLoading })

type SetProfilePhotosACType = {
   type: typeof SET_PHOTOS,
   photos: File | null
}
export const setProfilePhotosAC = (photos: File): SetProfilePhotosACType => ({ type: SET_PHOTOS, photos })

type SetErrorACType = {
   type: typeof SET_ERROR,
   error: string[]
}
export const setErrorAC = (error: string[]): SetErrorACType => ({ type: SET_ERROR, error })

type SetNullErrorACType = {
   type: typeof NULL_ERROR,
}
export const setNullErrorAC = () => ({ type: NULL_ERROR })


export const getUserProfileTC = (userID: number) => async (dispatch: any) => {
   let response = await getUser(userID)
   dispatch(setUserProfileAC(response))
}

export const getStatusOfUserTC = (id: number) => async (dispatch: any) => {
   const response = await getStatusOfUser(id)
   dispatch(setStatusOfUserAC(response))
}

export const updataStatusOfUserTC = (status: string) => async (dispatch: any) => {
   dispatch(setIsLoadingAC(true))
   const response = await updateStatusOfUser(status)
   if (response.resultCode == 0) {
      dispatch(setStatusOfUserAC(status))
      dispatch(setIsLoadingAC(false))
   }
}

export const saveProfileTC = (profile: InitialStateProfileType, userID: number) => async (dispatch: any) => {
   dispatch(setIsLoadingAC(true))
   dispatch(setNullErrorAC())
   let response = await saveProfile(profile)
   if (response.resultCode == 0) {
      dispatch(getUserProfileTC(userID))
      dispatch(setIsLoadingAC(false))
   } else {
      dispatch(setErrorAC(response.messages))
      dispatch(setIsLoadingAC(false))
      return Promise.reject()
   }
}


export default profileReducer