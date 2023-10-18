import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'Login Page' },
    { path: 'register', component: RegisterComponent, title: 'Register Page' },
    { path: 'home', component: HomeComponent, title: 'Home Page', canActivate: [authGuard] },
    { path: 'update/:id', component: UpdateComponent, title: 'Update Page', canActivate: [authGuard] },
    // { path: '**', component: NotFoundComponent, title: 'Error Page' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
