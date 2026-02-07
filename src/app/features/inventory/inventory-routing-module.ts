import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Productos } from './pages/productos/productos';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: Productos
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
