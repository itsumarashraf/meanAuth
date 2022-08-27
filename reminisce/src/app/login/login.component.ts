import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReminisceService } from '../services/reminisce.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,
    private sv: ReminisceService,
    private router: Router) { }

  ngOnInit(): void {
    this.initRegisterForm()
  }

  initRegisterForm(){
    this.loginForm = this.fb.group({
      email:[{value:"", disabled:false}],
      password:[{value:"", disabled:false}]
    })
  }

  login(){
    this.sv.loginUser(this.loginForm.value).subscribe(res =>{
      console.log(res)
      localStorage.setItem('token', res.token)
      this.router.navigate(['/programme'])
    },
    err=>{
      console.log('error ',err)
    })
  }
}
