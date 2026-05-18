import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart,totalcompte,url} = useContext(StoreContext);
  const navigate = useNavigate();
  const total = totalcompte();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-title">
          <p>Articles</p>
          <p>Titre</p>
          <p>Prix</p>
          <p>Quantité</p>
          <p>Total</p>
          <p>Supprimer</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-title cart-item-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p> {item.name} </p>
                  <p> {item.price} fcfa </p>
                  <p> {cartItems[item._id]} </p>
                  <p> {item.price * cartItems[item._id]} fcfa </p>
                  <p onClick={()=> removeFromCart(item._id)} >x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
       <div className="cart-bottom">
          <div className="cart-total">
            <h2>Montant total </h2>
            <div>
              <div className="details-cart">
                  <p>sous-total</p>
                  <p> {total} fcfa </p>
              </div>
              <hr />
              <div className="details-cart">
                 <p>Frais de livraison</p>
                 <p> {total === 0 ? 0 : 1000} fcfa </p>

              </div>
              <hr />
              <div className="details-cart">
                <b>Total</b>
                <b> {total+ (total === 0 ? 0 : 1000)} fcfa </b>
              </div>
            </div>
             <button onClick={()=> navigate('/order')} >procédez au paiement</button>
          </div>
          <div className="promocode">
            <div>
              <p>si vous avez un code promo, saisissez-le ici</p>
              <div className="promocode-inputs">
                <input type="text" placeholder="promo code " />
                <button>envoyer</button>
              </div>
            </div>
          </div>
       </div>
    </div>
  );
};

export default Cart;
