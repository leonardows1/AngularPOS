import { Component } from '@angular/core';
import { CategoryDTO } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  categories: CategoryDTO[] = [];
  activeMenu = false;
  counter = 0;

  constructor(
    private storeService: StoreService,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void{
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    });
    this.loadCategories();
  }

  ngOnChanges(){
    this.loadCategories();
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  loadCategories(){
    this.categoryService.getAllCategories()
    .subscribe(data => {
      this.categories = data;
    });
  }
}
