import React, { useState,useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';


const LoginPopup = ({setShowPopup}) => {
    const {url, setToken} = useContext(StoreContext);
    const [currState,setCurrState]= useState("connexion");
    const [agree, setAgree] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
      };
      
      const onLogin = async (e)=>{
        e.preventDefault();
        let newUrl = url;
        if(currState === "connexion"){
            newUrl += "/api/user/login";
        } else{ 
            newUrl += "/api/user/register";
        }
        const response = await axios.post(newUrl, data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowPopup(false);
        }

      };

     
  return (
    <div className='login-popup' >
        <form onSubmit={onLogin} className="popup-container">
            <div className="popup-title">
            <h2> {currState} </h2>
            <img onClick={()=> setShowPopup(false)} src={assets.cross_icon}  alt="Fermer"/>
            </div>
            <div className="popup-inputs">
                {currState=== "connexion"? <></> :<input onChange={handleChange} value={data.name} name="name" type="text" placeholder='Nom' required />}
                
                <input onChange={handleChange} value={data.email} name="email" type="email" placeholder='Email' required />
                <input onChange={handleChange} value={data.password} name="password" type="password" placeholder='Mot de passe' required />
            </div>
            <button type="submit"> {currState === "s'inscrire" ? "Créer un compte": "connexion"} </button>
            <div className="popup-conditions">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} required />
                <p> J’accepte les conditions de confidentialité</p>
            </div>
            {
            currState ==="connexion" ?
            <p>créer un nouveau compte <span onClick={()=> setCurrState("s'inscrire")} >cliquez ici</span> </p>
            :<p>vous avez déjà un compte ? <span onClick={()=> setCurrState("connexion")} > connectez-vous ici </span> </p>
            }
            
           
        </form>
      
    </div>
  )
}

export default LoginPopup
