// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import Logincomp from './components/login'
import Profilepage from './components/profilePage'
import NavComp from './components/navComp'
import TourAndTravelPage from './components/tourAndTravelPage'
import AuthRoute from './AuthRoute'
import UnAuthRoute from './unUthRoute';
import AllemployeeDetails from './components/allEmployeeDetail';
import AddConvence from './components/addConvence'

function App() {
const isAuthorised = ()=>{
  return 
}
  return (
    <>


    <Router>
    <NavComp isAuthorised ={isAuthorised}/> 
    <Switch>
    <UnAuthRoute path="/login"><Logincomp /></UnAuthRoute>
    <AuthRoute path="/profilepage"><Profilepage /></AuthRoute>
    <AuthRoute path="/tourAndTravelPage"><TourAndTravelPage /></AuthRoute>\
    <AuthRoute path="/AllemployeeDetails"><AllemployeeDetails /></AuthRoute>
    <AuthRoute path="/AddConvence"><AddConvence /></AuthRoute>

    </Switch>
    </Router>
    </>
    
  );
}

export default App;
