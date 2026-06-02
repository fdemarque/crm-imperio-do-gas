import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Clientes } from './components/clientes/clientes';
import { Automacoes } from './components/automacoes/automacoes';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'clientes', component: Clientes },
  { path: 'automacoes', component: Automacoes },
  { path: '**', redirectTo: '' }
];
