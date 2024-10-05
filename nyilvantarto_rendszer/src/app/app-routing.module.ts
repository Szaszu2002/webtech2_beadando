import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ContainerListComponent } from './components/container-list/container-list.component';
import { ContainerCreateComponent } from './components/container-create/container-create.component';
import { ContainerShareComponent } from './components/container-share/container-share.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';


const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'login'},
  {path: 'product-create/:id', component:ProductCreateComponent},
  {path: 'product-edit/:id', component:ProductEditComponent},
  {path: 'product-list/:id', component:ProductListComponent},
  {path: 'container-list/:id', component:ContainerListComponent},
  {path: 'container-create/:id', component:ContainerCreateComponent},
  {path: 'container-share/:id', component:ContainerShareComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: 'account-info', component:AccountInfoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
