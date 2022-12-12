import React from 'react';

import Container from '@material-ui/core/Container';

function RegistrationPage(){
  return<>

<Container maxWidth="sm">
 <h1> Registration Page</h1>
<div className="mb3">
<input type="text" placeholder="user name" className="form-control" /><br/>
<input type="password" placeholder="Password"  className="form-control" /><br/>
<input type="text" placeholder="Email adress" className="form-control" /><br/>
<button>Submit</button>
</div>
 </Container>
  </>
}

export default RegistrationPage;