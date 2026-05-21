import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext'
import './MyOrders.css'
import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const {url,token} = useContext(StoreContext);
    const [data,setData]=  useState([]);

    const fetchOrders = async ()=>{
       try{
         const response = await axios.post(url + "/api/order/userorders", {}, {headers:{token}});
        setData(response.data.data);

       }
       catch(error){
            console.log(error);
            
       }
        
    }
    useEffect(()=>{
        if (token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchOrders();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])


  return (
    <div className='my-orders' >
        <h2>Mes  commandes </h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    <div key={index} className='my-order-order' >
                        <img src={assets.parcel_icon} alt="" />
                        <p> {order.items.map((item,index)=>{
                            if (index === order.items.length -1) {
                                return item.name + 'x'+ item.quantity
                            }
                            else{
                               return item.name + 'x' + item.quantity + ','
                            }
                        })} </p>
                        <p> {order.amount} fcfa </p>
                        <p>Quantité: {order.items.length} </p>
                        <p> <span>&#x25cf;</span> <b> {order.status} </b> </p>
                        <button  onClick={fetchOrders} >Suivi de commande</button>

                    </div>
                )
            })}
        </div>
      
    </div>
  )
}

export default MyOrders
