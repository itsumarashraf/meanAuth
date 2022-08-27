import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ProgrammeComponent } from './programme/programme.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // default path:
  {
    path:"", redirectTo:"/login", pathMatch:"full"
  },
  {
    path:'programme', component: ProgrammeComponent, canActivate: [AuthGuard]
  },
  {
    path:"login", component:LoginComponent
  },
  {
    path:"register", component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
