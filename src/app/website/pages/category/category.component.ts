import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  productId: string | null = null;
  categoryId: string | null = null;
  products: ProductDTO[] = [];

  constructor(
  private route: ActivatedRoute,
  private categoryService: CategoryService
  ) {}

  ngOnInit(){
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('categoryId');
        if(this.categoryId){
         return this.categoryService.getProductsByCategory(this.categoryId);
        }
        return [];
      })
    )
    .subscribe((data) => {
      this.products = data;
    });

    this.route.queryParamMap.subscribe(params =>{
      this.productId = params.get('product');
    })
  }
}
