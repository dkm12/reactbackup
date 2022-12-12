import React,{Component} from 'react';

class Content extends Component{
render(){
 
  return  <div>
    <h1 >Name: {this.props.Empinfo.Name}</h1>
    <h1 >Age: {this.props.Empinfo.Age}</h1>
    <h1 >Designation: {this.props.Empinfo.Designation}</h1>
    <h1>Friends: {this.props.Frnd}</h1>
     

   
    </div>;
}

}


export default Content;