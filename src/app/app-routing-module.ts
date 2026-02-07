import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

const routes: Routes = [

  // =========================
  // AUTH (Login / Register)
  // =========================
  {
    path: 'auth',
    component: AuthLayout,
    canActivate: [GuestGuard],
    loadChildren: () =>
      import('./auth/auth-module').then(m => m.AuthModule)
  },

  // =========================
  // APP PRIVADA
  // =========================
  {
    path: '',
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inventory',
        loadChildren: () =>
          import('./features/inventory/inventory-module')
            .then(m => m.InventoryModule)
      }
    ]
  },

  // =========================
  // REDIRECCIONES
  // =========================
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
