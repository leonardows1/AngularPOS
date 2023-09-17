import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CategoryDTO } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { retry, map, catchError, throwError } from 'rxjs';
import { ProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private productsApiUrl: string = `${environment.API_URL}category/`;

  constructor(
    private http: HttpClient
  ) { }
  getProductsByCategory(categoryId: string){
    return this.http.get<ProductDTO[]>(`${this.productsApiUrl}${categoryId}/products/`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == HttpStatusCode.BadRequest) {
          return throwError(error.message)
        }
        if (error.status == HttpStatusCode.NotFound) {
          return throwError(error);
        }
        return throwError(error)
      })
    )
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
  getAllCategories() {
    return this.http.get<CategoryDTO[]>(this.productsApiUrl);
  }

  getCategoryById(categoryId: string){
    return this.http.get<CategoryDTO>(this.productsApiUrl + categoryId)
  }
}
