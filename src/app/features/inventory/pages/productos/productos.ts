import { Component, OnInit } from '@angular/core';
import { ProductosResponse } from '../../models/productosResponse.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryService } from '../../services/inventory.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.html',
  styleUrl: './productos.scss',
})
export class Productos implements OnInit {

  loading = false;
  productos: ProductosResponse[] = [];
  form: FormGroup;

   dataSource = new MatTableDataSource<ProductosResponse>();



  displayedColumns = ['codigo', 'nombre', 'stockActual'];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private snackBar: MatSnackBar
  ) {


    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required]
    });


  }

  ngOnInit(): void {
    this.loadProducts();
  }


  loadProducts(): void {
    this.inventoryService.getProducts().subscribe({
      next: (response) => {
        if (response.status === 'SUCCESS') {
          this.productos = response.data;
          this.dataSource.data = response.data;
        }
      },
      error: () => {
        this.snackBar.open(
          'Error al cargar productos',
          'Cerrar',
          { duration: 4000 }
        );
      }
    });
  }

 
  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;

    const request = {
      codigo: this.form.value.codigo!,
      nombre: this.form.value.nombre!,
      usuario: 'SYSTEM' 
    };

    this.inventoryService.createProduct(request)
      .subscribe({
        next: (response) => {
          this.loading = false;

          if (response.status === 'SUCCESS') {
            this.snackBar.open(response.message, 'OK', { duration: 3000 });
            this.form.reset();
            this.loadProducts(); 
          } else {
            this.snackBar.open(response.message, 'Cerrar', { duration: 4000 });
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