import { assets } from "../../assets/assets";
import "./Sidebar.css";
import {NavLink} from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/ajouter" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Ajouter un produit</p>
        </NavLink>

        <NavLink to="/liste" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Liste des produits</p>
        </NavLink>
        <NavLink to="/commandes" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Liste des commandes</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
