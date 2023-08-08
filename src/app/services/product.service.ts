import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProductDTO, ProductDTO, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsApiUrl = 'https://localhost:7155/api/product/';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<ProductDTO[]>(this.productsApiUrl);
  }

  getProduct(productId: string) {
    return this.http.get<ProductDTO>(this.productsApiUrl + productId);
  }

  create(product: CreateProductDTO) {
    return this.http.post<ProductDTO>(this.productsApiUrl, product);
  }

  update(productId: string, product: UpdateProductDTO) {
    return this.http.put(this.productsApiUrl + productId, product);
  }
}
