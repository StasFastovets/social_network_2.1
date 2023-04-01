import axios from "axios";

const instance = axios.create({
   withCredentials: true,
   headers: { "API-KEY": "2c69d427-2304-4c46-9c25-95ab5b9e7144" },
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
})


export const getAuth = async () => {
   const response = await instance.get(`auth/me`);
   return response.data;
}

export const getUser = async (userID) => {
   const response = await instance.get(`profile/${userID}`);
   return response.data;
}

export const logOut = async () => {
   const response = await instance.delete(`auth/login`)
   return response.data
}

export const logIn = async (email, password, rememberMe, captcha) => {
   const response = await instance.post(`auth/login`, { email, password, rememberMe, captcha })
   return response.data
}

export const getStatusOfUser = async (userID) => {
   const response = await instance.get(`profile/status/${userID}`)
   return response.data
}

export const updateStatusOfUser = async (status) => {
   const response = await instance.put(`profile/status`, { status })
   return response.data
}

export const getUsers = async (currentPage, pageSize) => {
   const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`)
   return response.data
}

export const followUser = async (UserID) => {
   const response = await instance.post(`follow/${UserID}`)
   return response.data
}

export const unfollowUser = async (UserID) => {
   let response = await instance.delete(`follow/${UserID}`)
   return response.data
}

export const savePhoto = async (photo) => {
   let formData = new FormData()
   formData.append('image', photo)
   const response = await instance.put(`profile/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
   });
   return response.data;
}

export const saveProfile = async (profile) => {
   let response = await instance.put(`profile`, profile)
   return response.data
}

export const getCaptchaUrl = async () => {
   let response = await instance.get(`security/get-captcha-url`)
   return response.data
}