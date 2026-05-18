import userModel from "../models/userModel.js";

// ajouter un article au panier de l’utilisateur
const addTocart = async (req,res)=>{
    try{
    let userData = await userModel.findById(req.userId);
    let cartData = userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1;
     
      }
      else{
        cartData[req.body.itemId] += 1;
      }
      await userModel.findByIdAndUpdate(req.userId,{cartData:cartData});
    return res.status(200).json({success:true, message:"Article ajouté au panier avec succès"})
    }
    catch(error){
      return res.status(500).json({success:false, message:"Erreur serveur", error:error.message})
    }

}
// supprimer un article du panier de l’utilisateur
const removeFromCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
            await userModel.findByIdAndUpdate(req.userId,{cartData:cartData});
            return res.status(200).json({success:true, message:"Article supprimé du panier avec succès"})

        }
    }
    catch(error){
        return res.status(500).json({success:false, message:"Erreur serveur", error:error.message})

    }


}
// récupérer le panier de l’utilisateur
const getCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        return res.status(200).json({success:true, message:"Panier récupéré avec succès", cartData:cartData})
    }
    catch(error){
        return res.status(500).json({success:false, message:"Erreur serveur", error:error.message})
    }

}
export {addTocart,removeFromCart,getCart}