import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDTO } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: ProductDTO = {
    productId: '',
    code: '',
    description: '',
    purchasePrice: 0,
    salePrice: 0,
    category: {
      categoryId: '',
      name: ''
    },
    productImages: [],
    isActive: false
  }

  @Output() addedProduct = new EventEmitter<ProductDTO>();
  @Output() showProduct = new EventEmitter<string>();
  @Output() productId = new EventEmitter<string>();

  ngOnInit(): void{

  }

  editProduct(){
    this.productId.emit(this.product.productId)
  }

  onAddToCart(){
    this.addedProduct.emit(this.product);
  }

  onShowDetail(){
    this.showProduct.emit(this.product.productId);
  }
}
