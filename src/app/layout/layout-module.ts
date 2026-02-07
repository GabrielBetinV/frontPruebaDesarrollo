import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayout } from './auth-layout/auth-layout';
import { MainLayout } from './main-layout/main-layout';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';


@NgModule({
  declarations: [
    AuthLayout,
    MainLayout
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
      AuthLayout,
    MainLayout
  ]
})
export class LayoutModule { }
