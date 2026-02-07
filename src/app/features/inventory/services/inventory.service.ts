import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { ProductoRequest } from '../models/productoRequest.model';
import { ProductoResponse } from '../models/productoResponse.model';
import { ProductosResponse } from '../models/productosResponse.model';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private readonly apiUrl = `${environment.apiUrl}/inventario`;

  constructor(private http: HttpClient) {}


  createProduct(product: ProductoRequest): Observable<ApiResponse<ProductoResponse>> {
    return this.http.post<ApiResponse<ProductoResponse>>(
      `${this.apiUrl}/producto`,
      product
    );
  }

   getProducts(): Observable<ApiResponse<ProductosResponse>> {
    return this.http.get<ApiResponse<ProductosResponse>>(
      `${this.apiUrl}/productos`
    );
  }


}
