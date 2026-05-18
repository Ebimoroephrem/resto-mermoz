
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import "./PlaceOrder.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {totalcompte,token,food_list,cartItems,url} = useContext(StoreContext);
  const navigate = useNavigate();
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    quarter:"",
    phone:""
  })
  const onchangeHandle =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }
    // Rediriger si pas connecté
  useEffect(()=>{
    if(!token){
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  const placeOrder = async(e)=>{
   
    e.preventDefault();
     // 1. Construire la liste des articles
      let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
      // 2. Construire l'objet commande
       let orderData = {
      address: data,
      items: orderItems,
      amount: totalcompte() + 1000  // total + frais livraison
    }
      // 3. Envoyer au backend → Stripe
      try{
        let response  = await axios.post(url + "/api/order/place",
        orderData,
        { headers: { token } })
        if (response.data.success) {
        // 4. Rediriger vers la page Stripe
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error("Erreur lors de la commande");
      }

      }
      catch(error){
        console.log(error);
        toast.error("Erreur server")
        

      } 

  }
   useEffect(()=>{
      if(!token){
        navigate('/cart')
      }
      else if(totalcompte()===0){
          navigate('/cart')
          }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[token])
  return (
    <div>
        <form onSubmit={placeOrder} className="place-order">
          <div className="order-left">
            <p className='title-order' >Information de livraison</p>
            <div className="input-order">
              <input required name='firstName' onChange={onchangeHandle} value={data.firstName} type="text" placeholder='Nom' />
              <input required name='lastName' onChange={onchangeHandle} value={data.lastName} type="text" placeholder='Prenom' />
            </div>
             <input required name='email'onChange={onchangeHandle} value={data.email} type="email" placeholder='Email' />
              <input required name='city'onChange={onchangeHandle} value={data.city} type="text" placeholder='Commune' />
               <div className="input-order">
              <input required name='quarter' onChange={onchangeHandle} value={data.quarter} type="text" placeholder='Quartier' />
              <input required name='street' onChange={onchangeHandle} value={data.street} type="text" placeholder='Rue si possible' />
            </div> 
            <input required name='phone' onChange={onchangeHandle} value={data.phone} type="text" placeholder='Numerode telehone' />
          </div>
          <div className="place-order-droit">
                <div className="cart-total">
            <h2>Montant total </h2>
            <div>
              <div className="details-cart">
                  <p>sous-total</p>
                  <p> {totalcompte()} fcfa </p>
              </div>
              <hr />
              <div className="details-cart">
                 <p>Frais de livraison</p>
                 <p> {totalcompte()  === 0 ? 0 : 1000} fcfa </p>

              </div>
              <hr />
              <div className="details-cart">
                <b>Total</b>
                    <b> {totalcompte()+ (totalcompte() === 0 ? 0 : 1000)} fcfa </b>
              </div>
            </div>
             <button type='submit' > paiement</button>
          </div>

          </div>
        </form>
      
    </div>
  )
}

export default PlaceOrder
