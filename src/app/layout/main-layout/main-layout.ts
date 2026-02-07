import { Component } from '@angular/core';
import { SessionService } from '../../core/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

  constructor(
    private session: SessionService,
    private router: Router
  ) {}

  logout(): void {
    this.session.logout();
    this.router.navigate(['/auth/login']);
  }
}
