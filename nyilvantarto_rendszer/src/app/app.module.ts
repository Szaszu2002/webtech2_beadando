import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ContainerCreateComponent } from './components/container-create/container-create.component';
import { ContainerListComponent } from './components/container-list/container-list.component';
import { ContainerEditComponent } from './components/container-edit/container-edit.component';
import { ContainerShareComponent } from './components/container-share/container-share.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { RegistrationComponent } from './components/registration/registration.component'
import { AccountInfoComponent } from './components/account-info/account-info.component'
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductEditComponent,
    ContainerListComponent,
    ContainerCreateComponent,
    ContainerEditComponent,
    ContainerShareComponent,
    LoginComponent,
    RegistrationComponent,
    AccountInfoComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule
  ],

  providers: [ApiService],
  bootstrap: [AppComponent]

})


export class AppModule { }
