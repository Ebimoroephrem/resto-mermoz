import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ categorie , setCategorie}) => {

  return (
    <div className='explore-menu' id='explore-menu' >
        <h2>découvrez notre menu</h2>
        <p className='menu-text' >Savourez une expérience culinaire unique, 
            pensée pour éveiller vos sens.</p>
        <div className='menu-list' >
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategorie(prev => prev === item.menu_name ? 'TOUT' : item.menu_name)} className="menu-item" key={index} >
                        <img className={categorie === item.menu_name ? 'aative' : ''} src={item.menu_image} alt="" />
                        <p> {item.menu_name} </p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu
