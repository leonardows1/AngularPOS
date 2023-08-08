import { Component, SimpleChanges } from '@angular/core';
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

  constructor(
    public dialog: MatDialog,
    private storeService: StoreService,
    private productService: ProductService
  ){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.updateProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateProducts();
  }

  onAddToShopingCart(product: ProductDTO) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(productId: string) {
    this.productService.getProduct(productId).subscribe(data => {
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  updateProducts() {
    this.productService.getAllProducts()
      .subscribe(data => {
        this.products = [];
        this.products = data;
        console.log(data);
      });
  }

  openCreateNewProduct(): void{
    const dialogRef = this.dialog.open(CreateProductComponent, {
      data: 'Aquí puedes pasar los datos necesarios para crear un nuevo producto, si es necesario.'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

      this.updateProducts();
    })
  }

  openEditProduct(productId: string): void{
    console.log(productId);
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: { productId: productId },
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.updateProducts();
    })
  }
}
