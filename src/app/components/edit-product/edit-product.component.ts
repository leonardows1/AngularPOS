import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { CategoryDTO } from 'src/app/models/category.model';
import { UpdateProductDTO } from 'src/app/models/product.model';
import { ProductImageDTO } from 'src/app/models/productImage.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  editProduct: UpdateProductDTO = {
    productId: '',
    code: '',
    description: '',
    categoryId: '',
    productImages: [],
    purchasePrice: 0,
    salePrice: 0,
    isActive: false
  }

  selectedCategory: CategoryDTO = {
    categoryId: '',
    name: ''
  }

  formControl = new FormControl('');
  categoriesList: CategoryDTO[] = []
  filterCategoryList!: Observable<CategoryDTO[]>;

  indexImage: number = 0;
  isActiveProduct: string = 'Activo';

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string },
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    console.log('desde el constructor de edit-product: ' + this.data.productId)
    this.updateCategories();
    this.filterCategoryList = this.formControl.valueChanges.pipe(
      startWith(''), map(value => this.filterCategory(value || ''))
    )
    if (this.data && this.data.productId) {
      this.editProduct = this.getProduct(this.data.productId);
    }
  }

  private filterCategory(value: string): CategoryDTO[] {
    const searchValue = value.toLocaleLowerCase();
    return this.categoriesList.filter(option => option.name.toLocaleLowerCase().includes(searchValue));
  }

  getProduct(productId: string): UpdateProductDTO {
    let product: UpdateProductDTO = {
      productId: '',
      code: '',
      description: '',
      categoryId: '',
      productImages: [],
      purchasePrice: 0,
      salePrice: 0,
      isActive: false
    };
    this.productService.getProduct(productId).subscribe(data => {
      product.productId = data.productId;
      product.code = data.code;
      product.description = data.description;
      product.categoryId = data.category.categoryId;
      product.productImages = data.productImages;
      product.purchasePrice = data.purchasePrice;
      product.salePrice = data.salePrice;
      product.isActive = data.isActive;
      this.selectCategory(product.categoryId);
      this.indexImage = product.productImages.length - 1;

      console.log('==============================');
      console.log(product.productImages.length);
      console.log(this.indexImage);
      console.log('==============================');
    });
    return product;
  }

  updateCategories() {
    this.categoryService.getAllCategories()
      .subscribe(data => {
        this.categoriesList = data;
      })
  }

  selectCategory(categoryId: string) {
    this.editProduct.categoryId = categoryId;
    this.categoryService.getCategoryById(categoryId).subscribe(data => {
      this.selectedCategory = data;
      console.log(this.selectedCategory);
    })
  }

  print(index: number) {
    console.log(this.editProduct.productImages[index]);
  }

  addField() {
    this.indexImage++;
    console.log(this.indexImage);
    let newImage: ProductImageDTO = {
      index: this.indexImage,
      url: ''
    }
    this.editProduct.productImages.push(newImage);
    console.log(this.editProduct.productImages);
  }

  removeField(index: Number) {
    this.editProduct.productImages = this.editProduct.productImages.filter(image => image.index != index);
    for (let index = 0; index < this.editProduct.productImages.length; index++) {
      this.editProduct.productImages[index].index = index;
    }
    console.log(this.editProduct.productImages);
    this.indexImage--;
  }


  activeProduct() {
    this.editProduct.isActive = !this.editProduct.isActive;
    if (this.editProduct.isActive) {
      this.isActiveProduct = 'Activo';
    }
    else {
      this.isActiveProduct = 'Inactivo';
    }
  }

  onClickEdit(): void {
    if (this.verifyFields()) {
      this.productService.update(this.editProduct.productId, this.editProduct).subscribe(data => {
        this.dialogRef.close();
      })
    }
  };

  onClickCancel(): void {
    this.dialogRef.close();
  };

  verifyFields(): boolean {
    return true;
  }
}
