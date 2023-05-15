import { useFormik, Field } from 'formik';
import * as Yup from 'yup'
import s from './users.module.scss';
import { FilterType } from '../../redux/usersReducer';
import React from 'react';



type PropsType = {
   onFilterChanget: (filter: FilterType) => void
}

const UserSearchForm: React.FC<PropsType> = React.memo(
   ({ onFilterChanget }) => {
      const formik = useFormik({
         initialValues: {
            term: '',
            friend: null
         },
         // validationSchema: Yup.object().shape({
         //    term: Yup.string()
         //       .matches(/[a-zA-Zа-яА-ЯёЁ0-9]$/, { message: 'Forbidden symbols' })
         //       .required('Please enter valid search parameters')
         // }),
         onSubmit: values => {
            // onFilterChanget(values)
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
               <select name="friend" onChange={formik.handleChange}>
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