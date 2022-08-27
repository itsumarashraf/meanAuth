import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ReminisceService {

  private _regUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  constructor(private http: HttpClient) { }

  registerUser(user:object){
    return this.http.post<any>(this._regUrl,user)
  }

  loginUser(user:object){
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getTodos(){
    return this.http.get<any>('http://localhost:3000/api/todos')
  }
}
