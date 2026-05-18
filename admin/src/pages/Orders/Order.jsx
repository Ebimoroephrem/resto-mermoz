/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from 'react'
import './Order.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import {assets} from '../../assets/assets'

const Order = ({uri}) => {
  const [orders, setOrders] = useState([]);

  const fetchAlls = async()=>{
    const response = await axios.get(uri + '/api/order/list');
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
      
    }
    else{
      toast.error("Erreur d'affichage")
    }
  }
  const statusHandler = async (e,orderId)=>{
    const response = await axios.post(uri + "/api/order/status", {
      orderId,
      status:e.target.value
    })
    if (response.data.success) {
      await fetchAlls();
    }

  }
  useEffect(()=>{
      fetchAlls();
  },[])
  return (
    <div className='order add' >
      <h2>page de commandes</h2>
      <div className="order-list">
        {
          orders.map((order,index)=>(
            <div key={index} className="order-item">
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className='order-item-food' >  {
                    order.items.map((item,index)=>{
                      if (index === order.items.length-1) {
                        return item.name + 'x' + item.quantity
                      }
                      else{
                        return item.name + 'x' + item.quantity + ','
                      }
                    })
                    } </p>
                    <p className="order-item-name"> {order.address.firstName + ' ' + order.address.lastName} </p>
                    <div className="order-item-address">
                      <p> {order.address.street + ','} </p>
                      <p> {order.address.city + ',' + order.address.quarter} </p>
                    </div>
                    <p className='order-item-phone' > {order.address.phone} </p>
                </div>
                 <p>Quantité: {order.items.length} </p>
                 <p> {order.amount} fcfa</p>
                 <select  onChange={(e)=> statusHandler(e, order._id) } value={order.status} >
                  <option value="en attente">En attente</option>
                  <option value="pret">pret a a la livraison</option>
                  <option value="livre">livré</option>
                 </select>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Order
