import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ToDoComponent } from './pages/to-do/to-do.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'to-do',
    component: ToDoComponent,
    canActivate: [AuthGuard]
  },
  // A rota padrão pode ser definida como 'redirectTo' ou 'pathMatch'
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
