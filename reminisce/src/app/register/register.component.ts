import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReminisceService } from '../services/reminisce.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder,
    private sv: ReminisceService,
    private router: Router) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(){
    this.registerForm = this.fb.group({
      email:[{value:"", disabled:false}],
      password:[{value:"", disabled:false}]
    })
  }

  register(){
    // console.log(this.registerForm.value)
    this.validateForm();
    this.sv.registerUser(this.registerForm.value).subscribe(res =>{
      console.log(res.token)
      localStorage.setItem('token', res.token)
      this.router.navigate(['/login'])
    })
  }

  validateForm(){

  }
}
