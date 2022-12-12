import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import { useHistory } from 'react-router-dom';




function Logincomp() {
  // const [login, setLogin] = useState("deepak");
  const [loigndetail, setLogindetail] = useState({ });
  const history = useHistory();

  const logininputhandler = (e) => {
    const name = e.target.name;
    const value = e.target.value
    // console.log('value',value)
    setLogindetail({ ...loigndetail, [name]: value });

  };

  // useEffect(()=>{
  //   loginHandler();
  // },[])
  
 
    function loginHandler (e) {
      e.preventDefault();
   

    const requestOption = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loigndetail)
    };

    
    // first way

    fetch("http://k8s-batadev-ingressd-0836da90f9-944557268.ap-south-1.elb.amazonaws.com/api/user/login/authenticate", requestOption).then((resp) => {
      resp.json().then((result) => {
        if (result.message === "Unauthorized") {
          alert("please enter correct  user name");
        }
        else if (result.token === "INVALID_CREDENTIALS") {
          alert("please enter correct  password");
        } else {
         
          localStorage.setItem('userinfo', JSON.stringify({ ...result, login: true, }));
         

         history.push("/profilepage")
        }
      })
    });

 
    // second way

    // let response = await fetch("http://k8s-batadev-ingressd-0836da90f9-944557268.ap-south-1.elb.amazonaws.com/api/user/login/authenticate", requestOption);
    // const result = await response.json();
    // console.log('result', result)
    // if (result.message === "Unauthorized") {
    //   alert("please enter correct  user name")
    // }
    // else if (result.token === "INVALID_CREDENTIALS") {
    //   alert("please enter correct  password")
    // }
    // else {
    //   localStorage.setItem('userinfo', JSON.stringify({ ...result, login: true, }));
    //   setLogindetail({ ...loigndetail, login: true });
    //   console.log("token", loigndetail);
    //   setLogin("dddddd");
    //   console.log('login llldndndjdjdjdjdjdjdjdj', login)
    //   history.push("/profilepage")
    // }


  }

  return <>
  
      <Container maxWidth="sm">
        <Card>
          <CardContent m={1} >
            <Box component="h2" m={1}>Please Enter Login Detail</Box>
            <form onSubmit={loginHandler} >
            <TextField label="user Name" fullWidth name="username" value={logininputhandler.UserName} onChange={logininputhandler} />
            <TextField type="password" label="password" fullWidth name="password" value={logininputhandler.password} onChange={logininputhandler} />
       <br/>
       <br/>
            <Button variant="contained" type="submit"  color="primary"> Submit</Button>
            </form>
           </CardContent>

        </Card>
      </Container>
    
  </>

}

export default Logincomp;