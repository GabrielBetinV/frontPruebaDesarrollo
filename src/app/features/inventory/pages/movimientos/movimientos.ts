import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryService } from '../../services/inventory.service';
import { ProductosResponse } from '../../models/productosResponse.model';
import { MatPaginator } from '@angular/material/paginator';
import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.scss',
  standalone: false
})
export class Movimientos implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading = false;
  productos: ProductosResponse[] = [];
  form: FormGroup;

  dataSource = new MatTableDataSource<ProductosResponse>();
  displayedColumns = ['codigo', 'nombre', 'stockActual'];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private snackBar: MatSnackBar,
    private session: SessionService
  ) {
    this.form = this.fb.group({
      productoId: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      tipo: ['ENTRADA', Validators.required]
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
      next: (res) => {
        if (res.status === 'SUCCESS') {
          this.productos = res.data;
          this.dataSource.data = res.data;
        }
      },
      error: () => {
        this.snackBar.open('Error al cargar productos', 'Cerrar', { duration: 4000 });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;


    const request = {
      productoId: this.form.value.productoId,
      cantidad: this.form.value.cantidad,
      usuario: this.session.getItem('usuario') ?? 'SYSTEM'
    };

    const call$ =
      this.form.value.tipo === 'ENTRADA'
        ? this.inventoryService.registrarEntrada(request)
        : this.inventoryService.registrarSalida(request);

    call$.subscribe({
      next: (res) => {
        this.loading = false;

        if (res.status === 'SUCCESS') {
          this.snackBar.open('Movimiento registrado', 'OK', { duration: 3000 });
          this.form.reset({ tipo: 'ENTRADA', cantidad: 0 });
          this.loadProducts();
        } else {
          this.snackBar.open(res.message, 'Cerrar', { duration: 4000 });
        }
      },
      error: () => {
        this.loading = false;
        this.snackBar.open(
          'Error al registrar movimiento',
          'Cerrar',
          { duration: 4000 }
        );
      }
    });
  }

}
