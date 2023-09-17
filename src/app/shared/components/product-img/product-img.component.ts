import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-img',
  templateUrl: './product-img.component.html',
  styleUrls: ['./product-img.component.scss']
})
export class ProductImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  @Input('img')set changeImg(newImg: string){
    this.img = newImg;
  }
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = 'https://images.pexels.com/photos/12355987/pexels-photo-12355987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log('ngOnChanges', 'imgValue =>', this.img);
    //console.log('changes', changes);
  }

  ngOnInit(): void {
    /*console.log('ngOnInit', 'imgValue =>', this.img);*/
    //this.counterFn = window.setInterval(() => {
    //  this.counter++;
    //  console.log('run counter');
    //}, 1000);
  }

  ngAfterViewInit() {
   /* console.log('ngAfterViewInit');*/
  }

  ngOnDestroy() {
    /*console.log('ngOnDestroy');*/
    /*window.clearInterval(this.counterFn);*/
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    /*console.log("Log hijo");*/
    this.loaded.emit(this.img);
  }
}
