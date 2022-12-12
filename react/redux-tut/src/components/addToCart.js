import React from 'react';
import '../App.css'
function AddToCartComp(props) {
console.log("add to cart",props.data)
  return <div>
    
    <div className="addToCartWrapper">
  <div className="addToCart">
   <img alt="aaa" src="../images/addToCart.png" /> 
<div className="cartCount">{props.data.length}</div>

  </div>
</div>

  </div>

}
export default AddToCartComp;


