import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

//Connecter un utilisateur
const userLogin = async(req,res)=>{
    const {email, password}= req.body;
    try{
        // Vérifier si l'utilisateur existe
        const User = await userModel.findOne({email});
         
        if(!User){
            return res.status(400).json({success: false, message: "Utilisateur non trouvé"});
        }
        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, User.password);
        if(!isMatch){
            return res.status(400).json({success: false, message: "Mot de passe incorrect"});
        }
        // Créer un token
        const token = createToken(User._id);
        res.status(200).json({success: true, message: "Connexion réussie", token});
    }catch(error){
        res.status(500).json({success: false, message: "Erreur du serveur"});
    }
}
const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}



//Créer un nouvel utilisateur
const userRegister = async(req,res)=>{
     const {name, email, password} = req.body;
    try{
        // Vérifier si l'utilisateur existe
        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(400).json({success: false, message: "L'utilisateur existe déjà"});
        }
        //verifier la valadtion email et mot de passe
        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Email non valide"});
        }
            if(password.length < 8){  
                return res.status(400).json({message: "Mot de passe trop court"});
            }
        //hachage du mot de passe utilisateur
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashPassword
        })
        const user  =   await newUser.save();
        const token = createToken(user._id);
        res.status(201).json({success: true, message: "Utilisateur créé avec succès", token});

    }catch(error){
        res.status(500).json({success: false, message: "Erreur du serveur"});

    }

}
export { userLogin, userRegister }; 