import React from 'react'
import style from './custom.module.css'

function StyleComp(){

return(
<div>
<h2 className="main-container1">style sheet method 1</h2>
<h2 style={{backgroundColor:'#ccc', textAlign:'center'}}>style sheet method 2</h2>
<h2 className={style.container2}>style sheet method 3</h2>

</div>
)

}

export default StyleComp;