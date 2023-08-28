import { Component, SimpleChanges } from '@angular/core';
import { ProductDTO } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  myShoppingCart: ProductDTO[] = [];
  total = 0;
  products: ProductDTO[] = [];
  showProductDetail = false;
  productChosen: ProductDTO = {
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
  initLimit: number = 3;
  initOffset: number = 0;
  limit: number = this.initLimit;
  offset: number = this.initOffset;

  constructor(
    public dialog: MatDialog,
    private storeService: StoreService,
    private productService: ProductService
  ){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.updateProductsList(this.initLimit, this.initOffset);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateProductsList(this.initLimit, this.initOffset);
  }

  onAddToShopingCart(product: ProductDTO) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(productId: string) {
    this.toggleProductDetail();
    this.productService.getProduct(productId).subscribe(data => {
      this.productChosen = data;
    }, error => {
      window.alert(error);
      console.log(error);
    });
  }

  updateProductsList(limit?: number, offset?: number, reload?: boolean) {

    this.productService.getAllProducts(limit, offset)
      .subscribe(data => {
        if (reload) {
          this.products = data;
          this.limit = this.initLimit;
          this.offset = this.initOffset;
        }
        else{
          this.products = this.products.concat(data);
        }
        this.offset += this.limit;
        console.log(this.products);
      });
  }

  openCreateNewProduct(): void{
    const dialogRef = this.dialog.open(CreateProductComponent, {
      data: 'Aquí puedes pasar los datos necesarios para crear un nuevo producto, si es necesario.'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.updateProductsList(this.initLimit, this.initOffset, true);
    })
  }

  openEditProduct(productId: string): void{
    console.log(productId);
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: { productId: productId },
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.updateProductsList(this.initLimit, this.initOffset, true);
    })
  }

  loadMore(){
    this.updateProductsList(this.limit, this.offset);
  }
}
