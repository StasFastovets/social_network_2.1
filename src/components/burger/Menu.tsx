import Burger from './Burger'
import s from './menu.module.scss'
import { useState } from 'react';
import cn from 'classnames'

const Menu = () => {

   const [menuActive, setMenuActive] = useState<boolean>(false)

   return (
      <div className={s.burger}>
         <nav>
            <div className={menuActive ? cn(s.burger_btn, s.burger_btn__active) : s.burger_btn} onClick={() => setMenuActive(!menuActive)}>
               <span></span>
            </div>
         </nav>
         <Burger active={menuActive} setActive={setMenuActive} />
      </div>
   )
}

export default Menu