import './Add.css'
import {assets} from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({uri}) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',    
        category: 'fruits',
        price: '',
    })
     // Gère les champs texte
      const handleChange = (e) => {
        const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };
   // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Veuillez sélectionner une image !");
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', Number(data.price));
    formData.append('image', image); // ← fichier image

    try {
      const response = await axios.post(
        `${uri}/api/food/add`,
        formData
      );

      if (response.data.success) {
        toast.success("Aliment ajouté avec succès !");
        // Reset du formulaire
        setData({ name: '', description: '', category: '', price: '' });
        setImage(null);
      }
    } catch (error) {
      toast.error("Erreur lors de l'ajout", error);
    }
  };
  
  return (
    <div className='add'>
        <form className="flex-col" onSubmit={handleSubmit}>
            <div className="img-upload flex-col ">
                <p>Téléchargez l'image</p>
                <label htmlFor="image">
                  <img src={ image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" className='upload'/>
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/> 
            </div>
            <div className="product-name flex-col">
                <p>Nom du produit</p>
                <input onChange={handleChange} value={data.name} type="text" name='name' placeholder='Tapez le nom du produit' required/>
            </div>
            <div className="product-description flex-col">
                <p>Description du produit</p>
                <textarea onChange={handleChange} value={data.description} name="description" id="description" rows="6" placeholder='Tapez la description du produit' required></textarea>
            </div>
            <div className="add-category">
                <div className="category flex-col">
                    <p>Catégorie du produit</p>
                <select onChange={handleChange} value={data.category} name="category" id="category" required>
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="Salade">Salade</option>
                    <option value="Riz">Riz</option>
                    <option value="Attiéké">Attiéké</option>
                    <option value="Grillades">Grillades</option>
                    <option value="Soupe">Soupe</option>
                     <option value="Alloco">Alloco</option>
                     <option value="Boissons">Boissons</option>
                      <option value="Desserts">Desserts</option>
                </select>
                </div>
                <div className="price flex-col">
                    <p>Prix du produit</p>
                    <input onChange={handleChange} value={data.price} type="number" name='price' placeholder=' prix' required/>
                </div>
            </div>
            <button type="submit" className="btn">Ajouter le produit</button>
        </form>
    </div>
  )
}

export default Add
