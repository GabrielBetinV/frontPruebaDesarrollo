import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private session: SessionService,
    private router: Router
  ) {}

  canActivate(): boolean {

    if (this.session.isLoggedIn()) {
      this.router.navigate(['/inventory/products']);
      return false;
    }

    return true;
  }
}
