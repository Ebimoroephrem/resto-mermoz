import React, { useContext, useState,  } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom' 
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({setShowPopup}) => {
  const [menu, setMenu ] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false)
  const {totalcompte,token,setToken} = useContext(StoreContext);
  const navigateToHome = useNavigate();
  
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigateToHome("/");

  }
  return (
    <div>
      <nav>
          <Link to='/' >  <img   src={assets.logo} className="logo" /> </Link>
              {/* Menu hamburger — visible uniquement sur mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
        <ul className={`nav-ul ${menuOpen ? "nav-ul-open" : ""}`}>
           <Link to='/'  onClick={()=>{setMenu("Home");setMenuOpen(false); }} className={menu==="Home" ? "active" : ""} >Home</Link>
            <a href='#explore-menu' onClick={()=>{setMenu("Menu");setMenuOpen(false); }} className={menu==="Menu" ? "active" : ""} >Menu</a>
           <a href='#app-dow' onClick={()=>{setMenu("Mobile-app");setMenuOpen(false); }} className={menu==="Mobile-app" ? "active" : ""} >Mobile-app</a>
          <a href='#footer' onClick={()=>{setMenu("Contacts");setMenuOpen(false); }} className={menu==="Contacts" ? "active" : ""} >Contacts</a>
        </ul>
        <div className="nav-right">
        <img src={assets.search_icon} alt="" />
        <div className="nav-icon">
          <Link to='/cart' ><img src={assets.basket_icon} alt="" /></Link>
          <div className={totalcompte() ===0 ? "" : "dot"}></div>
        </div>
         {!token?<button onClick={()=>setShowPopup(true)} >s'inscrire</button>
         : <div className="nav-profile"> 
             <img src={assets.profile_icon} alt="" /> 
            <ul className="nav-profile-menu"> 
              <li onClick={ ()=> navigateToHome('/myorders')} > <img src={assets.bag_icon}  alt="" /> <p>Mon panier</p> </li>
              <hr />
               <li onClick={logout} > <img src={assets.logout_icon}  alt="" /> <p>Se déconnecter</p> </li>

            </ul>

          </div>}
        
      </div>
      </nav>
      
    </div>
  )
}

export default Navbar
