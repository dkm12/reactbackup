import React from 'react';
import '../App.css'
function Home(props) {

  return <div>
    <h1>Home Component</h1>




    <div className="prodctMain">
      <div className="item">
        <img alt="aaa" src="https://images.macrumors.com/article-new/2017/09/iphonexdesign-800x669.jpg" /> 
        <h2>Iphone 11</h2>
        <p>A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance.</p>
        <button onClick={()=>props.addToCartHandler({price:70000, name:"I Phone 11 "})}>Add to cart</button>
        <button onClick={()=>props.removeToCartHandler({})}>Remove to cart</button>
      </div>

      
    </div>

  </div>

}
export default Home;