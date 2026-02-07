import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosResponse } from '../../models/productosResponse.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryService } from '../../services/inventory.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.html',
  styleUrl: './productos.scss',
})
export class Productos implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    // Filtro por código y nombre
    this.dataSource.filterPredicate = (data, filter) => {
      const value = filter.trim().toLowerCase();
      return (
        data.codigo.toLowerCase().includes(value) ||
        data.nombre.toLowerCase().includes(value)
      );
    };
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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