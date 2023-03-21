import React from 'react';
import s from './paginator.module.scss';
import { useState } from 'react';


const Paginator = ({ totalUsersCount, portionSize, ...props }) => {                    // paginator - постраничной вывод
   let pagesCount = Math.ceil(totalUsersCount / props.pageSize)                        // количество страниц, ceil - округляет в большую сторону
   let pages = []                                                                      // массив страниц
   for (let i = 1; i <= pagesCount; i++) {                                             //  for (let i = 1; i <= pagesCount; i++) {        
      pages.push(i)
   }

   let [portionNumber, setPortionNumber] = useState(1)

   let portionCount = Math.ceil(pagesCount / portionSize)                        // количество порций
   let leftPortionNumber = (portionNumber - 1) * portionSize + 1
   let rightPortionNumber = portionNumber * portionSize

   return (
      <div className={s.pages}>
         {portionNumber > 1 ? <button onClick={() => setPortionNumber(portionNumber - 1)} className={s.button}>Prev.</button> :
            <button disabled='none' className={s.button}>Prev.</button>
         }
         {pages
            .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
            .map(p => <span onClick={() => props.onPageChanget(p)} className={props.currentPage === p ? s.currentPage : s.page} key={p}>
               {p}
            </span>)}
         {portionNumber < portionCount ? <button onClick={() => setPortionNumber(portionNumber + 1)} className={s.button}>Next</button> :
            <button disabled='none' className={s.button}>Next</button>
         }
      </div>
   )
}



export default Paginator;

