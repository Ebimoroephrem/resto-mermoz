/* eslint-disable react-hooks/set-state-in-effect */
import './List.css'
import { useState,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const List = ({uri}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
  try {
    const response = await axios.get(`${uri}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    }
  } catch (error) {
    toast.error("Erreur serveur", error);
  }
};
//
const removeFood = async (foodId)=>{
  try{
    const response = await axios.post(`${uri}/api/food/delete/`,{id:foodId});
    if (response.data.success) {
      toast.success("Plat supprimé avec succès");
      fetchList(); // Re-fetch the list to update the UI
    }
  } catch (error) {
    toast.error("Erreur serveur", error);
  }

}
useEffect(()=>{
  fetchList();
},[])
  return (
    <div className='list add flex-col'>
        <h1>Liste des plats</h1>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Nom</b>
            <b>Description</b>
            <b>Prix</b>
            <b>Actions</b>
          </div>
          {list.map((item,index)=>{
            return(
              <div className="list-table-format" key={index}>
                <img src={`${uri}/images/${item.image}`} alt={item.name} className='list-table-format-image' />
                <span>{item.name}</span>
                <span>{item.description}</span>
                <span>{item.price}  fcfa</span>
                <span onClick={() => removeFood(item._id)} className='cursor' > X</span>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List
