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

export const logOut = () => {
   return (
      instance.delete(`auth/login`).then(response => response.data)
   )
}

export const logIn = (email, password, rememberMe) => {
   return (
      instance.post(`auth/login`, { email, password, rememberMe }).then(response => response.data)
   )
}

export const getStatusOfUser = (userID) => {
   return (
      instance.get(`profile/status/${userID}`).then(response => response.data)
   )
}

export const updateStatusOfUser = (status) => {
   return (
      instance.put(`profile/status`, { status }).then(response => response.data)
   )
}

export const updateProfilePhoto = (photo) => {
   return (
      instance.put(`profile/photo`, { photo }).then(response => response.data)
   )
}

export const updateProfileData = (data) => {
   return (
      instance.put(`profile`, { ...data }).then(response => response.data)
   )
}

export const getUsers = (currentPage, pageSize) => {
   return (
      instance.get(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => {
            return response.data
         })
   )
}

export const followUser = (UserID) => {
   return (
      instance.post(`follow/${UserID}`).then(response => response.data)
   )
}

export const unfollowUser = (UserID) => {
   return (
      instance.delete(`follow/${UserID}`).then(response => response.data)
   )
}

export const savePhoto = async (photo) => {
   let formData = new FormData()
   formData.append('image', photo)
   const response = await instance.put(`profile/photo`, formData, {
      headers : {'Content-Type': 'multipart/form-data'}
   });
   return response.data;
}