import React from 'react';
import { Link } from 'react-router-dom'


function Nav() {

  return <div>
    <div className="navigation">
      <ul>
        <li><Link to="/RegistrationPage">Register page</Link></li>
        <li><Link to="/stateComponent">State With Function Component</Link></li>
        <li> <Link to="/StateWithClassComp">State With Class Component </Link></li>
        <li><Link to="/stateComponent">State With Function Component</Link></li>
        <li> <Link to="/StateWithClassComp">State With Class Component </Link></li>
        <li><Link to="/stateComponent"> stateComponent </Link></li>
        <li><Link to="/StateWithClassComp"> StateWithClassComp  </Link></li>
        <li><Link to="/StateWithFunctionComponent"> StateWithFunctionComponent </Link></li>
        <li><Link to="/StateWithClassComp">   StateWithClassComp   </Link></li>
        <li><Link to="/GetInputBoxVale">GetInputBoxVale</Link></li>
        <li><Link to="/HideAndShow">HideAndShow </Link></li>
        <li> <Link to="/FormCOmp"> FormCOmp </Link></li>
        <li><Link to="/FormValidation">FormValidation </Link></li>
        <li><Link to="/ComponentDidUUpdate">ComponentDidUUpdate </Link></li>
        <li><Link to="/UseeffectWithStatePropsComp">UseeffectWithStatePropsComp </Link></li>
        <li><Link to="/StyleComp">StyleComp </Link></li>
        <li><Link to="/Reactmap">Reactmap </Link></li>
        <li><Link to="/ReacMapOnNestedArray">ReacMapOnNestedArray  </Link></li>
        <li><Link to="/ChildToParent">ChildToParent </Link></li>
        <li><Link to="/MemohookComp">MemohookComp</Link></li>
        <li><Link to="/RefComp">RefComp </Link></li>
        <li><Link to="/UseRefComp">UseRefComp</Link></li>
        <li><Link to="/ForwordRefParent">ForwordRefParent </Link></li>
        <li><Link to="/UserList">User List</Link></li>
        <li><Link to="/FirstApiUse">Basic Api Use</Link></li>
        <li><Link to="/PreviousProps">Previous props</Link></li>
        <li><Link to="/CurdOPeration">CurdOPeration</Link></li>
        <li><Link to="/RegistrationFormWithTrick">Registration Form</Link></li>
        
        

      </ul>
    </div>





  </div>
}
export default Nav;