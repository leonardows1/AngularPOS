import { Component } from '@angular/core';
import { ProductDTO } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  productId: string | null = null;
  products: ProductDTO[] = [];
  limit: number = 4;
  offset: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.updateProductsList(this.limit, this.offset, true);
    this.route.queryParamMap.subscribe(params =>{
      this.productId = params.get('product');
      console.log(this.productId);
    })
  }

  loadMore(){
    this.productService.getAllProducts(this.limit, this.offset)
      .subscribe(data => {
        this.offset += this.limit + 1;
        this.products = this.products.concat(data);
        console.log('Cargar más', this.products);
      });
  }

  updateProductsList(limit?: number, offset?: number, reload?: boolean) {

    this.productService.getAllProducts(limit, offset)
      .subscribe(data => {
        if (reload) {
          this.products = data;
          this.limit = this.limit;
          this.offset = this.offset;
        }
        else{
          this.products = this.products.concat(data);
        }
        this.offset += this.limit;
        console.log('Actualización', this.products);
      });
  }
}
