import { Component, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { ProductDTO } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  myShoppingCart: ProductDTO[] = [];
  total = 0;
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
  @Input() products: ProductDTO[] = [];
  // @Input() productId: string | null = null;
  @Input() set productId(productId: string | null){
    if (productId) {
      this.onShowDetail(productId);
    }
  }
  @Output() moreProducts = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private storeService: StoreService,
    private productService: ProductService
  ){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onAddToShopingCart(product: ProductDTO) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(productId: string) {
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productService.getProduct(productId).subscribe(data => {
      this.productChosen = data;
    }, error => {
      window.alert(error);
    });
  }



  openCreateNewProduct(): void{
    const dialogRef = this.dialog.open(CreateProductComponent, {
      data: 'Aquí puedes pasar los datos necesarios para crear un nuevo producto, si es necesario.'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

  openEditProduct(productId: string): void{
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: { productId: productId },
    });
    dialogRef.afterClosed().subscribe(res => {
    })
  }

  loadMore(){
    this.moreProducts.emit();
  }
}
