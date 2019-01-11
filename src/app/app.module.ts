import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './employees/employees.component';

import { MatRadioModule,MatSelectModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule, } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { httpInterceptorProviders } from './shared/auth/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeEditComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	  HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
	  MatTableModule,
	  MatPaginatorModule,
	  FormsModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [httpInterceptorProviders
],
  bootstrap: [AppComponent]
})
export class AppModule { }
