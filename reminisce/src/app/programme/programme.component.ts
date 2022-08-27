import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReminisceService } from '../services/reminisce.service';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})
export class ProgrammeComponent implements OnInit {

  todolist:any[] =[]
  constructor(private sv:ReminisceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTodoList()
  }

  getTodoList(){
    this.sv.getTodos().subscribe({
      next: res =>{
      this.todolist = res
    },
    error: err =>{
      if(err instanceof HttpErrorResponse){
        if(err.status=== 401){
          console.log('api verification failed')
          this.router.navigate(['/login'])
        }
      }
    }
  })
  }
}
