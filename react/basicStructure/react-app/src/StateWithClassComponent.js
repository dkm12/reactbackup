import React, { Component } from 'react';

class StateWithClassComp extends Component {
constructor(){
  super()
  this.state={
    data:"Deepak Mishra"
  }
}  
 render(){
   return <div className="main-container">
<h1>State with class component</h1>
<h2>{this.state.data}</h2>
<button onClick={()=>this.setState({data:"Vidit Mishra"})}>UpdateName</button>

   </div>
 }

}


export default StateWithClassComp;