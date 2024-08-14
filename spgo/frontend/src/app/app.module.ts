import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }from '@angular/material/input';
import { MatButtonModule }from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { HeaderComponent } from './components/templates/header/header.component';
import { NavComponent } from './components/templates/nav/nav.component';
import { RegistrationComponent } from './components/views/user/registration/registration.component';
import { CardComponent } from './components/templates/card/card.component';
import { LoginComponent } from './components/views/user/login/login.component';
import { ResetPasswordComponent } from './components/views/user/reset-password/reset-password.component';
import { EmployeeComponent } from './components/views/employee/employee.component';
import { MeasuresUnitComponent } from './components/views/supply/measures-unit/measures-unit.component';
import { FeedstockComponent } from './components/views/supply/feedstock/feedstock.component';
import { HomeComponent } from './components/views/home/home.component';
import { UsersListComponent } from './components/lists/users-list/users-list.component';
import { FilterComponent } from './components/templates/filter/filter.component';
import { PaginatorComponent } from './components/templates/paginator/paginator.component';
import { ConfirmComponent } from './components/shared/dialog/confirm/confirm.component';
import { DialogEditComponent } from './components/views/user/registration/dialog-edit/dialog-edit.component';
import { TesteListComponent } from './components/lists/teste-list/teste-list.component';
import { DialogListGroupsComponent } from './components/shared/dialog/dialog-list-groups/dialog-list-groups.component';
import { UnitsListComponent } from './components/lists/units-list/units-list.component';
import { DialogListUnitsComponent } from './components/shared/dialog/dialog-list-units/dialog-list-units.component';
import { FeedstockListComponent } from './components/lists/feedstock-list/feedstock-list.component';
import { FeedstockDialogEditionComponent } from './components/views/supply/feedstock/feedstock-dialog-edition/feedstock-dialog-edition.component';
import { EmployeeListComponent } from './components/lists/employee-list/employee-list.component';
import { EmployeeDialogEditionComponent } from './components/views/employee/employee-dialog-edition/employee-dialog-edition.component';
import { ContractorComponent } from './components/views/contractor/contractor.component';
import { ContactDialogCreateComponent } from './components/views/contractor/contact/contact-dialog-create/contact-dialog-create.component';
import { AddressDialogCreateComponent } from './components/views/contractor/address/address-dialog-create/address-dialog-create.component';
import { ContractorListComponent } from './components/lists/contractor/contractor-list/contractor-list.component';
import { ContactListComponent } from './components/lists/contractor/contact-list/contact-list.component';
import { AddressListComponent } from './components/lists/contractor/address-list/address-list.component';
import { ContactDialogAddComponent } from './components/views/contractor/contact/contact-dialog-add/contact-dialog-add.component';
import { DialogListContractorComponent } from './components/shared/dialog/dialog-list-contractor/dialog-list-contractor.component';
import { ContactComponent } from './components/views/contractor/contact/contact.component';
import { AddressDialogAddComponent } from './components/views/contractor/address/address-dialog-add/address-dialog-add.component';
import { ContractorDialogEditComponent } from './components/views/contractor/contractor-dialog-edit/contractor-dialog-edit.component';
import { AddressComponent } from './components/views/contractor/address/address.component';
import { StepComponent } from './components/views/step/step.component';
import { StepListComponent } from './components/lists/step-list/step-list.component';
import { StepDialogEditionComponent } from './components/views/step/step-dialog-edition/step-dialog-edition.component';
import { CardDialogComponent } from './components/templates/card-dialog/card-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    RegistrationComponent,
    CardComponent,
    LoginComponent,
    ResetPasswordComponent,
    EmployeeComponent,
    MeasuresUnitComponent,
    FeedstockComponent,
    HomeComponent,
    UsersListComponent,
    FilterComponent,
    PaginatorComponent,
    ConfirmComponent,
    DialogEditComponent,
    TesteListComponent,
    DialogListGroupsComponent,
    UnitsListComponent,
    DialogListUnitsComponent,
    FeedstockListComponent,
    FeedstockDialogEditionComponent,
    EmployeeListComponent,
    EmployeeDialogEditionComponent,
    ContactDialogCreateComponent,
    AddressDialogCreateComponent,
    ContractorListComponent,
    ContractorComponent,
    ContactListComponent,
    AddressListComponent,
    ContactDialogAddComponent,
    DialogListContractorComponent,
    ContactComponent,
    AddressDialogAddComponent,
    ContractorDialogEditComponent,
    AddressComponent,
    StepComponent,
    StepListComponent,
    StepDialogEditionComponent,
    CardDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressBarModule
  ],
  providers: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
