import { useFormik, Field } from 'formik';
import * as Yup from 'yup'
import s from './users.module.scss';
import { FilterType, getUsersTC, ThunkUsersType } from '../../redux/usersReducer';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentPage, getPageSize } from '../../redux/users_selectors';
import { AnyAction } from 'redux';
import { getFilteredUsers } from './../../redux/users_selectors';


type UserSearchFormType = {
   term: string
   friend: string
   setSearchParams: () => void
}

const UserSearchForm: React.FC<UserSearchFormType> = React.memo(
   ({ term, friend }) => {

      const currentPage = useSelector(getCurrentPage)
      const pageSize = useSelector(getPageSize)

      const dispatch = useDispatch()

      const onFilterChanget = (filter: FilterType) => {
         const action = getUsersTC(currentPage, pageSize, filter.term, filter.friend)
         dispatch(action as ThunkUsersType & AnyAction);
      }

      const formik = useFormik({
         initialValues: {
            term: term,
            friend: friend
         },
         onSubmit: values => {
            const friend = values.friend === "true" ? true : values.friend === "false" ? false : null;
            onFilterChanget({ term: values.term, friend });
         },
      });

      return (
         <form onSubmit={formik.handleSubmit}>
            <div className={s.form__search}>
               <input
                  name='term'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.term}
                  placeholder='search user'
               />
               {formik.touched.term && formik.errors.term ? <p>{formik.errors.term}</p> : null}
            </div>
            <div className={s.form__select}>
               <select name="friend" onChange={formik.handleChange} value={formik.values.friend}>
                  <option value="null">All</option>
                  <option value="true">Only followed</option>
                  <option value="false">Only unfollowed</option>
               </select>
            </div>
            <div className={s.form__submit}>
               <button type='submit'>Search</button>
               <button type='button' onClick={() => formik.resetForm()}>Reset</button>
            </div>
         </form>
      )
   }
)



export default UserSearchForm