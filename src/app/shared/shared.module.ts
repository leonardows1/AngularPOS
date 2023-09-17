import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighlightDirective } from './directives/highlight.directive';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductImgComponent } from './components/product-img/product-img.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ProductImgComponent,
    CreateProductComponent,
    EditProductComponent,
    AlertComponent,
    HighlightDirective,
    ReversePipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatTreeModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ProductComponent,
    ProductsComponent,
    ProductImgComponent,
    CreateProductComponent,
    EditProductComponent,
    AlertComponent,
    HighlightDirective,
    ReversePipe,
    TimeAgoPipe,
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatTreeModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
