import axios from "axios";
import { InitialStateProfileContactsType, InitialStateProfilePhotosType, InitialStateProfileType } from "../redux/authReducer";


const instance = axios.create({
   withCredentials: true,
   headers: { "API-KEY": "2c69d427-2304-4c46-9c25-95ab5b9e7144" },
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})

export enum ResultCode {
   Success = 0,
   Error = 1,
   CaptchaIsRequired = 10
}
////////////////////////////////////////////////////////////////////////
type GetAuthType = {
   data: { id: number, email: string, login: string }
   resultCode: ResultCode
   messages: Array<string>
}

export const getAuth = async () => {
   const response = await instance.get<GetAuthType>(`auth/me`);
   return response.data;
}
///////////////////////////////////////////////////////////////////////
type PhotosType = {
   small: string | null
   large: string | null
}

type GetUserType = {
   photos: InitialStateProfilePhotosType
   contacts: InitialStateProfileContactsType
   fullName: string
   userId: number
   lookingForAJob: boolean
   lookingForAJobDescription: string
   aboutMe: string
}

export const getUser = async (userID: number) => {
   const response = await instance.get<GetUserType>(`profile/${userID}`);
   return response.data;
}
/////////////////////////////////////////////////////////////////////////////////////////
type ApiType = {
   resultCode: ResultCode
   messages: Array<string>
   data: object
}

export const logOut = async () => {
   const response = await instance.delete<ApiType>(`auth/login`)
   return response.data
}
////////////////////////////////////////////////////////////////////////////////////////
export const logIn = async (email: string, password: string, rememberMe: boolean, captcha: string) => {
   const response = await instance.post<ApiType>(`auth/login`, { email, password, rememberMe, captcha })
   return response.data
}
////////////////////////////////////////////////////////////////////////////////////////
export const getStatusOfUser = async (userID: number) => {
   const response = await instance.get<string>(`profile/status/${userID}`)
   return response.data
}
////////////////////////////////////////////////////////////////////////////////////////
export const updateStatusOfUser = async (status: string) => {
   const response = await instance.put<ApiType>(`profile/status`, { status })
   return response.data
}
///////////////////////////////////////////////////////////////////////////////////////
type ItemType = {
   id: number
   name: string
   status: string | null
   followed: boolean
   photos: PhotosType
}

type GetUsersType = {
   items: Array<ItemType>
   totalCount: number
   error: string | null
}

export const getUsers = async (currentPage: number, pageSize: number) => {
   const response = await instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
   return response.data
}
////////////////////////////////////////////////////////////////////////////////////////////
export const followUser = async (UserID: number) => {
   const response = await instance.post<ApiType>(`follow/${UserID}`)
   return response.data
}
/////////////////////////////////////////////////////////////////////////////////
export const unfollowUser = async (UserID: number) => {
   let response = await instance.delete<ApiType>(`follow/${UserID}`)
   return response.data
}
///////////////////////////////////////////////////////////////////////////////////////////////
type DataType = {
   photos: PhotosType
}

type SavePhotoType = {
   data: DataType
   resultCode: ResultCode
   message: Array<string>
}

export const savePhoto = async (photo: File) => {
   let formData = new FormData()
   formData.append('image', photo)
   const response = await instance.put<SavePhotoType>(`profile/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
   });
   return response.data;
}
/////////////////////////////////////////////////////////////////////////////////////////
export const saveProfile = async (profile: InitialStateProfileType) => {
   let response = await instance.put<ApiType>(`profile`, profile)
   return response.data
}
//////////////////////////////////////////////////////////////////////////////////////////
type GetCaptchaUrl = {
   url: string
}
export const getCaptchaUrl = async () => {
   let response = await instance.get<GetCaptchaUrl>(`security/get-captcha-url`)
   return response.data
}