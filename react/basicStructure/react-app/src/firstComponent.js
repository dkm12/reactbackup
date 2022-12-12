import React from 'react';

// function  FirstComponents (){
//   let data="dkmishra12@gmail.com";

// function Student(){
//   let data="dkm"
//   alert(data);
// }

// return (
//   <div>
// <h1>{data}</h1>
// <button onClick={Student  }>Click me</button>
// </div>
// );
// }

function FirstComponents(){
 const [data, setData]=React.useState("Ravi");
 function Updatedata(){
  setData("Dkm123");
  alert(data); 

 }  
return(<div>
<h1>{data}</h1>
<button onClick={Updatedata}>updatedata</button>
</div>
);

}



export default FirstComponents;