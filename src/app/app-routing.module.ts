import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardService } from './auth/service/auth-guard.service';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'authpage', component: SignInComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'add-invoice', component: AddInvoiceComponent, canActivate: [AuthGuardService] },
  { path: 'edit-invoice/:id', component: EditInvoiceComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
