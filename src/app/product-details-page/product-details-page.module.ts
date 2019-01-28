import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsPageRoutingModule } from './product-details-page-routing.module';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ProductDetailsPageComponent } from './components/product-details-page/product-details-page.component';
import { ProductImagePreviewComponent } from './components/product-description/product-image-preview/product-image-preview.component';
import { SharedModule } from '../shared/shared.module';
import { HeadingComponent } from '../shared/components/heading/heading.component';

@NgModule({
  declarations: [ProductDetailsPageComponent, ProductDescriptionComponent, ProductImagePreviewComponent],
  imports: [
    CommonModule,
    ProductDetailsPageRoutingModule,
    SharedModule
  ]
})
export class ProductDetailsPageModule { }
