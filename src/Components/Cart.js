import React,{useState,useEffect} from "react";
import AddressForm from '../Components/AddressForm'
import Loader from "./Loader";
const Cart = ({ cartItems, removeFromCart ,updateQuantity}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const token =localStorage.getItem("token");
  if(!token){
    window.location.href='/login';
  }
  else{
     setLoading(false);
  }
}, []);
if (loading) {
  return <Loader />; 
}
  return (
    <div className="cart">
     
      {cartItems.length === 0 ? (
        <>
        <h2 className="text-danger">Cart</h2>
        <p>Your cart is empty.</p>
        </>
      ) : (
        <>
        <div className=" cart-product-container">
        <div className="col cart-detail-left ">
          
          {cartItems.map((product) => (
            <div className="cart-section px-4" key={product.id}>
              <div className="cart-data">
               <div className="img-con"><img
                  src={product.image}
                  className="cart-img-top"
                  alt={product.name}
                />
                </div> 
                <div className="cart-body">
                
                  <p className="cart-text">{product.description}</p>
                  <div className="card-btn">
                    <p className="card-text text-danger fw-bold" > RS.{ product.price}</p>
                    <p className="card-text incre_decre_btn">
                    <button 
                       className="increase_decrease_btn"
                      onClick={() => updateQuantity(product.id, 'decrease')}
                      disabled={product.quantity === 1}
                    >
                      -
                    </button>
                      {product.quantity}

                    <button 
                      className="increase_decrease_btn"
                      onClick={() => updateQuantity(product.id, 'increase')}
                    >
                      +
                    </button>
                      </p>
                  </div>
                  <div className="card-btn">
                    <button
                      className="btn proceed-to-check"
                      onClick={() => removeFromCart(product)}
                    >
                    <svg style={{marginTop:'-15px'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                    </button>

                    
                  </div>
                </div>
              </div>
            </div>
           
          ))}
          
        </div>
        <div className="cart-detail-right">
          <AddressForm/>
         
        </div>
        </div>
          </>
      )}
      
    </div>
  );
};

export default Cart;
