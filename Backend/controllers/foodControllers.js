
import foodModel from "../models/foodModel.js";
import fs from "fs";

//Créer un nouvel aliment

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image obligatoire" });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename,
    });

    await food.save();
    res.status(201).json({ success: true, message: "Aliment ajouté avec succès" });

  } catch (error) {
    console.error("Erreur lors de l'ajout:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// afficher lA liste de tous les aliments
const foodList = async (req,res)=>{
    try{
        const  foods = await foodModel.find();
        res.status(200).json({success:true, data:foods});
    }
    catch(error){
        res.status(500).json({success:false, message:"Erreur serveur"});
    }

}
// supprimer un aliment
const deleteFood = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{} );
          
            await foodModel.findByIdAndDelete(req.body.id);
            res.status(200).json({success:true, message:"Aliment supprimé avec succès"});  
        }
          catch(error){
            console.log(error);
            res.json({success:false, message: 'Erreur'})

    }

}
    

export {addFood, foodList, deleteFood};