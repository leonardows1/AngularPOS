import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Alert } from 'src/app/models/alert.model';
import { CategoryDTO } from 'src/app/models/category.model';
import { CreateProductDTO, ProductDTO } from 'src/app/models/product.model';
import { ProductImageDTO } from 'src/app/models/productImage.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  formControl = new FormControl('');
  categoriesList: CategoryDTO[] = []
  filterCategoryList!: Observable<CategoryDTO[]>;

  indexImage: number = 0;

  newProduct: CreateProductDTO = {
    code: '',
    description: '',
    categoryId: '',
    productImages: [{
      index: this.indexImage,
      url: ''
    }],
    purchasePrice: 0,
    salePrice: 0,
    isActive: true
  }

  isActiveProduct: string = 'Activo';

  createdProduct: ProductDTO = {
    productId: '',
    code: '',
    description: '',
    category: {
      categoryId: '',
      name: ''
    },
    productImages: [],
    purchasePrice: 0,
    salePrice: 0,
    isActive: false
  }

  alert: Alert = {
    color: '',
    message: '',
    isVisible: false
  }

  ngOnInit() {
    this.updateCategories();
    this.filterCategoryList = this.formControl.valueChanges.pipe(
      startWith(''), map(value => this.filterCategory(value || ''))
    )
  }

  private filterCategory(value: string): CategoryDTO[] {
    const searchValue = value.toLocaleLowerCase();
    return this.categoriesList.filter(option => option.name.toLocaleLowerCase().includes(searchValue));
  }

  updateCategories() {
    this.categoryService.getAllCategories()
      .subscribe(data => {
        this.categoriesList = data;
        console.log(data);
      })
  }

  selectCategory(categoryId: string) {
    this.newProduct.categoryId = categoryId;
    console.log(categoryId);
  }

  print(index: number){
    console.log(this.newProduct.productImages[index]);
  }

  addField() {
    this.indexImage++;
    let newImage: ProductImageDTO = {
      index: this.indexImage,
      url: ''
    }
    this.newProduct.productImages.push(newImage);
    console.log(this.newProduct);
  }

  removeField(index: Number) {
    this.newProduct.productImages = this.newProduct.productImages.filter(image => image.index != index);
    for (let index = 0; index < this.newProduct.productImages.length; index++) {
      this.newProduct.productImages[index].index = index;
    }
    console.log(this.newProduct.productImages);
    this.indexImage--;
  }


  activeProduct() {
    this.newProduct.isActive = !this.newProduct.isActive;
    if (this.newProduct.isActive) {
      this.isActiveProduct = 'Activo';
    }
    else {
      this.isActiveProduct = 'Inactivo';
    }
  }

  onClickCreate(): void {
    if (this.verifyFields()) {
      this.productService.create(this.newProduct).subscribe(data =>
        {
          if (data != null) {
            this.createdProduct = data,
            console.log(this.createdProduct);
            this.alert.color = 'green';
            this.alert.message = 'El producto ha sido creado'
            this.alert.isVisible = true;
            this.dialogRef.close();
          }
        })
    }
  };

  onClickCancel(): void {
    this.dialogRef.close();
  };

  verifyFields(): boolean{
    if (this.newProduct.code == '') {
      return false;
    }
    if (this.newProduct.description == '') {
      return false;
    }
    if (this.newProduct.categoryId == '') {
      return false;
    }
    for (let index = 0; index < this.newProduct.productImages.length; index++) {
      if (this.newProduct.productImages[index].url == '') {
        return false;
      }
    }
    return true;
  }
}
