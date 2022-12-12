import React, { Component } from 'react';

class ComponentDidUUpdate extends Component {
  constructor() {
    super();
    this.state = {
      count:0
    }
    console.warn("constructor");
  }
componentDidUpdate(preState) 
  {
    console.warn("componentDidUpdate", preState.count,this.state.count);
    if(preState.count===this.state.count){
    
      alert("Document already updated")
    }
   
  }
  render() {
  

    return <div className="main-container"><h1 >{this.state.count}</h1>
    <button onClick={()=>this.setState({count:1})}>Update Name</button></div>
  }

}


export default ComponentDidUUpdate;