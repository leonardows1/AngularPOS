import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, ProductDTO, UpdatePartialProductDTO, UpdateProductDTO } from '../models/product.model';
import { PatchDTO } from '../models/patch.model';
import { retry, catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { checkTime } from '../interceptors/time.interceptor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsApiUrl: string = `${environment.API_URL}product/`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json-patch+json' });

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams;
    if(limit){
      params = params.set('limit', limit);
    }
    if (offset) {
      params = params.set('offset', offset)
    }

    return this.http.get<ProductDTO[]>(this.productsApiUrl, {
      params,
      context: checkTime()
    })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.salePrice
        }
      }))
    );
  }

  getProduct(productId: string) {
    return this.http.get<ProductDTO>(this.productsApiUrl + productId)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.BadRequest) {
          return throwError(error.message)
        }
        if (error.status == HttpStatusCode.NotFound) {
          return throwError(error.message)
        }
        return throwError(error.message)
      })
    )
  }

  create(product: CreateProductDTO) {
    return this.http.post<ProductDTO>(this.productsApiUrl, product);
  }

  update(productId: string, product: UpdateProductDTO) {
    return this.http.put(this.productsApiUrl + productId, product);
  }

  updatePartial(productId: string, patch: PatchDTO[]){

    return this.http.patch(this.productsApiUrl + productId, patch);
  }
}
