import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/sidebar/Sidebar"
import {Route,Routes } from "react-router-dom"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Order from "./pages/Orders/Order"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
   const uri = 'http://localhost:4000';
  
  return (
    <div >
      <ToastContainer />
      <Navbar/>
      <hr />
      <div className="app"> 
        <Sidebar/>
        <Routes>
          <Route path="/ajouter" element={<Add uri={uri}/>} />
           <Route path="/liste" element={<List uri={uri}/>} />
            <Route path="/commandes" element={<Order uri={uri}/>} />
        </Routes>
      </div>
      
    </div>
  )
}

export default App
