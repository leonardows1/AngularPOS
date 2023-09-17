import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductDTO } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent{

  productId: string | null = null;
  product: ProductDTO | null = {
    productId: '',
    code: '',
    description: '',
    category: {
      categoryId: '',
      name: ''
    },
    isActive: false,
    productImages: [],
    purchasePrice: 0,
    salePrice: 0
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location,
  ) {}

  ngOnInit(){
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get('productId');
        console.log(this.productId);
        if(this.productId){
          return this.productService.getProduct(this.productId);
        }
        return [null];
      })
    )
    .subscribe((data) => {
      console.log(data);
      this.product = data;
    });
  }

  goToBack(){
    this.location.back();
  }
}
