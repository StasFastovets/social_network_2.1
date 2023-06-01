import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { actionsUsers, getUsersTC, ThunkUsersType } from '../../../redux/usersReducer';
import { getCurrentPage, getFilteredUsers, getPageSize, getPortionNumber, getPortionSize, getTotalUsersCount } from '../../../redux/users_selectors';
import s from "./paginator.module.scss"


const Paginator: React.FC = (props) => {                                    // paginator - постраничной вывод
   
   const totalUsersCount = useSelector(getTotalUsersCount)
   const pageSize = useSelector(getPageSize)
   const portionNumber = useSelector(getPortionNumber)
   const portionSize = useSelector(getPortionSize)
   const filter = useSelector(getFilteredUsers)
   const currentPage = useSelector(getCurrentPage)

   const dispatch = useDispatch()

   const onPageChanget = (pageNumber: number, portionNumber: number) => {
      dispatch(actionsUsers.setCurrentPage(pageNumber))
      dispatch(actionsUsers.setPortionNumber(portionNumber))
   
      const action = getUsersTC(pageNumber, pageSize, filter)
      dispatch(action as ThunkUsersType & AnyAction);
   }
   
   let pagesCount = Math.ceil(totalUsersCount / pageSize)                              // количество страниц, ceil - округляет в большую сторону
   let pages = []                                                                      // массив страниц
   for (let i = 1; i <= pagesCount; i++) {                                             //  for (let i = 1; i <= pagesCount; i++) {        
      pages.push(i)
   }

   let [portionNum, setPortionNumber] = useState(portionNumber)


   let portionCount = Math.ceil(pagesCount / portionSize)                        // количество порций
   let leftPortionNumber = (portionNum - 1) * portionSize + 1
   let rightPortionNumber = portionNum * portionSize

   return (
      <div className={s.pages}>
         {portionNum > 1 ? <button onClick={() => setPortionNumber(portionNum - 1)} className={s.button}>Prev.</button> :
            <button disabled={true} className={s.button}>Prev.</button>
         }
         {pages
            .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
            .map(p => <span onClick={() => onPageChanget(p, portionNum)} className={currentPage === p ? s.currentPage : s.page} key={p}>
               {p}
            </span>)}
         {portionNum < portionCount ? <button onClick={() => setPortionNumber(portionNum + 1)} className={s.button}>Next</button> :
            <button disabled={true} className={s.button}>Next</button>
         }
      </div>
   )
}



export default Paginator;

