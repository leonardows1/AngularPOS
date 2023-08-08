import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryDTO } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private productsApiUrl = 'https://localhost:7155/api/category/';

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories() {
    return this.http.get<CategoryDTO[]>(this.productsApiUrl);
  }

  getCategoryById(categoryId: string){
    return this.http.get<CategoryDTO>(this.productsApiUrl + categoryId)
  }
}
