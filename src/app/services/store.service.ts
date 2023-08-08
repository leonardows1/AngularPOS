import { Injectable } from '@angular/core';
import { ProductDTO } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: ProductDTO[] = [];
  private myCart = new BehaviorSubject<ProductDTO[]>([]);

  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct(product: ProductDTO) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.salePrice, 0);
  }
}
