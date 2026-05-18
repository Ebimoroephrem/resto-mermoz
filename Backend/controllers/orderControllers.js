import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//passer une commande utilisateur pour le frontend

const placeOrder = async (req,res)=>{

    const Frontend_url = "http://localhost:5173"

    try{
          
        //// 1. On crée l'instance — juste en mémoire pour l'instant
        const newOrder = new orderModel({
            userId:req.userId,
            items: req.body.items,
            amount:req.body.amount,
            address:req.body.address,
             payment:false
        })
        //2. On sauvegarde — maintenant ça va dans MongoDB
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.userId,{cartData:{}})
        const line_items = req.body.items.map((item)=>({
             price_data:{
                currency:"usd",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price *100 
            },
             quantity: item.quantity  // Quantité OBLIGATOIRE
        }) )
        line_items.push({
            price_data:{
                currency: "usd",
                product_data:{
                    name:" frais de livraisons"
                },
                unit_amount:1000*100
            },
            quantity:1
        })
         //  Création d'une session Stripe
        const session = await  stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items:line_items,
            mode: "payment",
            success_url:`${Frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${Frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
           
        
        // MongoDB crée le document avec un _id automatique
        // et ajoute les valeurs par défaut (status, date
        res.status(201).json({success:true, session_url: session.url})
          
           

    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false, message:"Erreur"})

    }

}
// Verification du paiement 
const verifyOrder = async (req,res)=>{
    const {orderId, success} = req.body
   try{
     if (success === 'true') {
        await orderModel.findByIdAndUpdate(orderId,{payment:true})
        res.status(200).json({success:true, message:"paiement verifier"})
    }else{
        await orderModel.findByIdAndDelete(orderId);
        res.status(401).json({success:false, message:"erreur paiement"})
    }

   }
   catch(error){
    console.log(error);
    
    res.status(500).json({success:false, message:"erreur server"})

   }

}
//commandes utilisateur pour le frontend
const userOrders = async (req,res)=>{
    try{
        const response  = await orderModel.find({userId:req.userId})
        res.status(200).json({success:true, data:response})

    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Une erreur est survenu"})
        

    }


}
// Listes des commandes des utilisateurs coté admin

    const listOrders = async (req,res)=>{
        try{
            const orders = await orderModel.find({});
            res.json({success:true, data:orders})
        }
        catch(error){
            console.log(error)
            res.json({success:false, message:'Erreur server'})
        }

    }
        // processus des mise a jour de la livraison en attente, pret, livré 
    const updateStatus = async (req,res)=>{
        try{
            const update = await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
            res.status(200).json({success:true, message:"Mise a jour du statut"})
        }
        catch(error){
            console.log(error);
            res.status(401).json({success:false, message:"Erreur mise a jour"})
        }

    }

export {placeOrder,verifyOrder,userOrders,listOrders, updateStatus}