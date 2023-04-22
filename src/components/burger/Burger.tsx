import Navigation from '../navbar/navbar'
import s from './burger.module.scss'
import cn from 'classnames'

type BurgerPropsTypes = {
   active: boolean
   setActive: (active: boolean) => void
}

const Burger: React.FC<BurgerPropsTypes> = ({ active, setActive }) => {
   return (
      <div className={active ? cn(s.menu, s.menu__active) : s.menu} onClick={() => setActive(false)}>
         <div className={s.menu__content}>
            <Navigation />
         </div>
      </div>
   )
}

export default Burger