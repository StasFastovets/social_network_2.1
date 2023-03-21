import Navigation from '../navbar/navbar'
import s from './burger.module.scss'

const Burger = ({ active, setActive }) => {
   return (
      <div className={active ? `${s.menu} ${s.menu__active}` : s.menu} onClick={() => setActive(false)}>
         <div className={s.menu__content}>
            <Navigation />
         </div>
      </div>
   )
}

export default Burger