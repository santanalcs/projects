import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './components/views/user/registration/registration.component';
import { LoginComponent } from './components/views/user/login/login.component';
import { ResetPasswordComponent } from './components/views/user/reset-password/reset-password.component';
import { EmployeeComponent } from './components/views/employee/employee.component';
import { MeasuresUnitComponent } from './components/views/supply/measures-unit/measures-unit.component';
import { FeedstockComponent } from './components/views/supply/feedstock/feedstock.component';
import { HomeComponent } from './components/views/home/home.component';
import { authGuard } from './guards/auth.guard.guard';
import { UsersListComponent } from './components/lists/users-list/users-list.component';
import { TesteListComponent } from './components/lists/teste-list/teste-list.component';
import { UnitsListComponent } from './components/lists/units-list/units-list.component';
import { FeedstockListComponent } from './components/lists/feedstock-list/feedstock-list.component';
import { EmployeeListComponent } from './components/lists/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'usuario/cadastrar', component: RegistrationComponent },
  { path: 'usuario/redefinir/senha', component: ResetPasswordComponent },
  { path: 'colaborador/cadastrar', component: EmployeeComponent, canActivate: [authGuard] },
  { path: 'unidade/medida/cadastrar', component: MeasuresUnitComponent, canActivate: [authGuard] },
  { path: 'insumo/cadastrar', component: FeedstockComponent, canActivate: [authGuard] },
  { path: 'listar/usuarios', component: UsersListComponent, canActivate: [authGuard] },
  { path: 'listar/colaboradores', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'listar/unidades/medidas', component: UnitsListComponent, canActivate: [authGuard] },
  { path: 'listar/insumos', component: FeedstockListComponent, canActivate: [authGuard] },
  { path: 'listar/testes', component: TesteListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
