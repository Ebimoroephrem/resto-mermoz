import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div>
        <nav>
            <img className='logo' src={assets.logo} alt="" />
            <img className='profile' src={assets.profile} alt="" />

        </nav>
        <hr />
    
      
    </div>
  )
}

export default Navbar
