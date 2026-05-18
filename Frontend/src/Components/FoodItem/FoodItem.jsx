import { assets } from "../../assets/assets"
import { StoreContext } from "../../Context/StoreContext";
import './FoodItem.css'
import { useContext, } from "react"


const FoodItem = ({id, name, description, price, image}) => {

   
    const  {cartItems,addToCart, removeFromCart,url} = useContext(StoreContext)
  return (
    <div className='food-item'>
        <div className="container-food">
            <img src={ url +"/images/"+ image}  className='food-item-image'/>
            { ! cartItems[id]
                 ? <img className="add" onClick={()=> addToCart(id)} src={assets.add_icon_white} alt="" /> 
                 : <div className="food-item-container">
                    <img src={assets.remove_icon_red} 
                         onClick={()=> removeFromCart(id)} 
                         alt="diminuer" />
                    <span>{cartItems[id]}</span>
                    <img src={assets.add_icon_green} 
                         onClick= { ()=> addToCart(id) }
                          alt="augmenter" />
                 </div>
            }
        </div>
        <div className='food-item-info'>
            <div className="food-rating">
                <span >{name}</span>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-desc" >{description}</p>
            <span className="food-price">{price} fcfa</span>
        </div>
      
    </div>
  )
}

export default FoodItem
