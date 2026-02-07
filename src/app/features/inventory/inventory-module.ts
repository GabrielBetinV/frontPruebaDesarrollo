import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing-module';
import { Productos } from './pages/productos/productos';
import { Movimientos } from './pages/movimientos/movimientos';
import { SharedModule } from '../../shared/shared-module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Productos,
    Movimientos
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InventoryModule { }
