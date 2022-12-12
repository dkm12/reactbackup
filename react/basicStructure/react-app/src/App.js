// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React,{Component} from 'react';
import { Route,Switch } from 'react-router-dom'
import StateWithClassComp from './StateWithClassComponent';
import StateWithFunctionComponent from './StateWithFunctionComponent';
import GetInputBoxVale from './GetInputBoxValue';
import HideAndShow from './HideShowOnClick';
import FormCOmp from './form';
import FormValidation from './FormValidation';
import ComponentDidUUpdate from './componentDidUpdate'; 
import UseeffectWithStatePropsComp from './UseeffectWithStatePropes';
import StyleComp from './styleComp';
import Reactmap from './ReactmapComp';
import ReacMapOnNestedArray from './MapOnNestedArray';
import ChildToParent from './ChildToPParent';
import MemohookComp from './MemoHookComp';
import RefComp from './RefCom';
import UseRefComp from './useRefComp';
import ForwordRefParent from './forwordREfParent';
import UserList from './UserList';
import User from './User'
import FirstApiUse from './apiUse'
import AddUser from './addUser';
import UpdateUser from './updateUser';
import PreviousProps from './previousProps';
import CurdOPeration from './curdOpertion'
import RegistrationPage from './registerPage';
import ContextApiCommonComp from './ContextApiCommonComp';
import RegistrationFormWithTrick from './useStsteRegistrationFormWithtrick'
import Footer from './footer';
import Header from './header'
// import Content from './content';
// import FirstComponents from './firstComponent';
// let employeeInfo ={Name:"Deepak Mishra", Age:31, Designation:"Software Engg." };
// let Friends=["Deepak", "vidit", "Rajiv", "Akshat"];
class App extends Component{

render(){
  return  <div>
    <Header />
    <Switch>
    <Route path="/RegistrationPage"> <RegistrationPage  /></Route>
    <Route path="/StateWithFunctionComponent"> <StateWithFunctionComponent  /></Route>
    <Route path="/StateWithClassComp">   <StateWithClassComp />  </Route>
    <Route path="/GetInputBoxVale"><GetInputBoxVale /></Route>
    <Route path="/HideAndShow"><HideAndShow /></Route>
    <Route path="/FormCOmp"> <FormCOmp /></Route>
    <Route path="/FormValidation"><FormValidation /></Route>
    <Route path="/ComponentDidUUpdate"><ComponentDidUUpdate /></Route>
    <Route path="/UseeffectWithStatePropsComp"><UseeffectWithStatePropsComp /></Route>
    <Route path="/StyleComp"><StyleComp /></Route>
    <Route path="/Reactmap"><Reactmap /></Route>
    <Route path="/ReacMapOnNestedArray"><ReacMapOnNestedArray /> </Route>
    <Route path="/ChildToParent"><ChildToParent /></Route>
    <Route path="/MemohookComp"><MemohookComp /></Route>
    <Route path="/RefComp"><RefComp /></Route>
    <Route path="/UseRefComp"><UseRefComp /></Route>
    <Route path="/ForwordRefParent"><ForwordRefParent /></Route>
    <Route path="/UserList"><UserList /></Route>
    <Route path="/User/:id"><User /></Route>
    <Route path="/FirstApiUse"><FirstApiUse /></Route>
    <Route path="/addUser"><AddUser /></Route>
    <Route path="/UpdateUser/:id"><UpdateUser /></Route>
    <Route path="/PreviousProps"><PreviousProps /></Route>
    <Route path="/CurdOPeration"><CurdOPeration /></Route>
    <Route path="/ContextApiCommonComp"><ContextApiCommonComp /></Route>
    <Route path="/RegistrationFormWithTrick"><RegistrationFormWithTrick /></Route>

    
    
    </Switch>
    <Footer />
    
    
  {/* <Header />  
  <Footer /> */}
  {/* <FirstComponents /> */}
  {/* <Content 
  Name="Deepak Mishra" 
  Age={26} 
  />
  <Content Name="Vidit Mishra" Age={28} /> */}
{/* <Content Empinfo={employeeInfo} Frnd={Friends[2]} /> */}
  
  </div>
}

}


export default App;

