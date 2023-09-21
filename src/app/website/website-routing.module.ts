import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { exitGuard } from '../guards/exit.guard';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'category',
        loadChildren: () =>
        import('./pages/category/category.module').then(c => c.CategoryModule),
        data: {
          preload: true,
        }
      },
      {
        path: 'my-cart',
        component: MyCartComponent
      },
      {
        path: 'product/:productId',
        component: ProductDetailsComponent
      },
      {
        path: 'register',
        canDeactivate: [exitGuard],
        component: RegisterComponent
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
