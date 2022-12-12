import React, { Component, createRef } from 'react';

class RefComp extends Component {

  constructor(){
    super();
    this.inputref= createRef();
}
getdata(){
  this.inputref.current.style.color="#ff0000"
  console.log(this.inputref.current.value)
} 


  render() {
    return <div className="main-container">
      <h1>Ref on class Component</h1>
      <input type="text"  ref={this.inputref}/>
      <button onClick={()=>this.getdata()}>get data</button>
      

    </div>
  }

}


export default RefComp;