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
import { ContractorComponent } from './components/views/contractor/contractor.component';
import { ContractorListComponent } from './components/lists/contractor/contractor-list/contractor-list.component';
import { ContactListComponent } from './components/lists/contractor/contact-list/contact-list.component';
import { AddressListComponent } from './components/lists/contractor/address-list/address-list.component';
import { ContactComponent } from './components/views/contractor/contact/contact.component';
import { AddressComponent } from './components/views/contractor/address/address.component';
import { StepComponent } from './components/views/step/step.component';
import { StepListComponent } from './components/lists/step-list/step-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'usuario/cadastrar', component: RegistrationComponent },
  { path: 'usuario/redefinir/senha', component: ResetPasswordComponent },
  { path: 'colaborador/cadastrar', component: EmployeeComponent, canActivate: [authGuard] },
  { path: 'contratador/cadastrar', component: ContractorComponent, canActivate: [authGuard] },
  { path: 'contratador/contato/cadastrar', component: ContactComponent, canActivate: [authGuard] },
  { path: 'contratador/endereco/cadastrar', component: AddressComponent, canActivate: [authGuard] },
  { path: 'unidade/medida/cadastrar', component: MeasuresUnitComponent, canActivate: [authGuard] },
  { path: 'insumo/cadastrar', component: FeedstockComponent, canActivate: [authGuard] },
  { path: 'etapa/cadastrar', component: StepComponent, canActivate: [authGuard] },
  { path: 'listar/usuarios', component: UsersListComponent, canActivate: [authGuard] },
  { path: 'listar/colaboradores', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'listar/empreiteiros', component: ContractorListComponent, canActivate: [authGuard] },
  { path: 'listar/empreiteiros/contatos', component: ContactListComponent, canActivate: [authGuard] },
  { path: 'listar/empreiteiros/enderecos', component: AddressListComponent, canActivate: [authGuard] },
  { path: 'listar/etapas', component: StepListComponent, canActivate: [authGuard] },
  { path: 'listar/unidades/medidas', component: UnitsListComponent, canActivate: [authGuard] },
  { path: 'listar/insumos', component: FeedstockListComponent, canActivate: [authGuard] },
  { path: 'listar/testes', component: TesteListComponent },
]

/*const routes1: Routes = [
  { path: 'listar/empreiteiros/ederecos', component:ContactComponent},
]*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
