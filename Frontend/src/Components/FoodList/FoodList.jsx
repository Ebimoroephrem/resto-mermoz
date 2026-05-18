import {  useContext } from 'react'
import './FoodList.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodList = ({categorie}) => {
    const {food_list} = useContext(StoreContext);
  return (
    <div className='food-display' id='food-display' >
        <h2>Plats principaux à proximité de votre domicile</h2>
        <div className="food-display-list">
            {food_list.map((item,index) =>{
              {console.log(categorie, item.category)}
              if (categorie=== 'TOUT' || categorie === item.category) {
                return <FoodItem key={index} id={item._id} 
                name={item.name} description={item.description} 
                price={item.price} image={item.image}/>
              }
                
            })}
            </div>            
    </div>
  )
}

export default FoodList
