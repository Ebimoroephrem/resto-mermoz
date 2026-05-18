
import React, { useContext, useEffect,useRef } from 'react'
import './VerifyOrder.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyOrder = () => {
    const Verified = useRef(false);
    const[searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
      

    const verifyPayment = async () => {
    
    try {
        
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            navigate('/myorders');
            toast.success("Paiement validé ✅");
        } else {
            navigate('/');
            toast.error("Paiement échoué ❌");
        }
    } catch (error) {
        console.error(error);
        navigate('/');
        toast.error("Erreur serveur");
    }
}
    useEffect(()=>{
        // eslint-disable-next-line no-undef
        if (!Verified.current) {
            // eslint-disable-next-line no-undef
            Verified.current = true;
            verifyPayment();
        }
    },[])

  return (
    <div className='verify' >
        <div className="spinner">

        </div>
      
    </div>
  )
}

export default VerifyOrder
