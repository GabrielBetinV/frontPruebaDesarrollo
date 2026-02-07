import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;

  this.authService.register({
    username: this.form.value.username,
    passwordHash: this.form.value.password
  }).subscribe({
    next: (response) => {
      this.loading = false;

      switch (response.status) {

        case 'SUCCESS':
          this.snackBar.open(
            response.message ?? 'Usuario creado correctamente',
            'OK',
            { duration: 3000 }
          );
          this.router.navigate(['/auth/login']);
          break;

        case 'INFO':
          this.snackBar.open(
            response.message,
            'Entendido',
            { duration: 4000 }
          );
          break;

        default:
          this.snackBar.open(
            response.message ?? 'Error al registrar',
            'Cerrar',
            { duration: 4000 }
          );
          break;
      }
    },
    error: () => {
      this.loading = false;
      this.snackBar.open(
        'Error de comunicación con el servidor',
        'Cerrar',
        { duration: 4000 }
      );
    }
  });
}


}
