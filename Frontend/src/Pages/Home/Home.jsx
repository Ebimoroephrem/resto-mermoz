
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import './Home.css'
import { useState } from 'react'
import FoodList from '../../Components/FoodList/FoodList'
import AppDowload from '../../Components/AppDowload/AppDowload'

const Home = () => {

  const [categorie, setCategorie] = useState('TOUT')

  return (
    <div>
        <Header/>
        <ExploreMenu categorie={categorie} setCategorie={setCategorie} />
        <FoodList categorie={categorie} />
        <AppDowload/>
        
    </div>
  )
}

export default Home
