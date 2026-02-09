import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {


  form: FormGroup;
  loading = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;

    this.authService.login({
      username: this.form.value.username!,
      password: this.form.value.password!
    }).subscribe({
      next: (response) => {
        this.loading = false;

        if (response.status === 'SUCCESS') {

          console.log(response)
          localStorage.setItem('token', response.data[0].token);
          localStorage.setItem('usuario', response.data[0].usuario);

          this.snackBar.open(response.message, 'OK', { duration: 3000 });
          this.router.navigate(['/inventory']);
        } else {
          console.log(response)
          this.snackBar.open(response.message, 'Cerrar', { duration: 4000 });
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 401) {
          this.snackBar.open(
            'Usuario o contraseña incorrectos',
            'Cerrar',
            { duration: 4000 }
          );
        } else {
          this.snackBar.open(
            'Error de comunicación con el servidor',
            'Cerrar',
            { duration: 4000 }
          );
        }
      }
    });
  }

}
