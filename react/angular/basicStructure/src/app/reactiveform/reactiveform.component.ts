import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,NgForm, Validators, FormArray } from '@angular/forms';
import { PipeDecorator } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { formsignup } from '../formsignup';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent implements OnInit {
  signupForm: FormGroup;
 constructor(private frmbuilder:FormBuilder) { 
this.signupForm=frmbuilder.group({
  fName:['', Validators.required],
  lName:[''],
  exp:['', Validators.required],
  depart:['', Validators.required],
  location:['', Validators.required],
  desig:['', Validators.required],
  reg:['', Validators.required],
  mob:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
})


  }  

  ngOnInit(): void {

//     this.signupForm.get('fName')?.valueChanges.subscribe(
// uname=>{console.log('Name change: '+ uname );
// } )

// this.signupForm.valueChanges.subscribe((uname:formsignup)=>
//   {
//     console.log('Name change: '+ uname.fName );
//     console.log('Name change: '+ uname.lName );
//     console.log('Name change: '+ uname.depart );
//     console.log('Name change: '+ uname.desig );
//     console.log('Name change: '+ uname.exp ); 
//     console.log('Name change: '+ uname.location );
//     console.log('Name change: '+ uname.mob );
//     console.log('Name change: '+ uname.reg )
//   }
// )

// this.signupForm.get('fName')?.statusChanges.subscribe(usname=>
//   {
//     console.log('Name  validatin status : '+ usname );
//   }
// )

this.signupForm.statusChanges.subscribe( status=>
  {
    console.log('Name  validatin status : '+ status );
  }
);

const arr= new FormArray([
new FormControl(),
new FormControl('', Validators.minLength(7)), 

])
arr.setValue(['Deepak Mishra', 'Sapna '])
arr.reset(['Rahul', 'Manish'])
console.log(arr.value);
console.log(arr.status)


  }

  PostData(signupForm:any){
    
    console.log(signupForm.value );
    signupForm.reset();
    
    }


}


