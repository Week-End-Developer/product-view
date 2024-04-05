import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductViewCardComponent } from './product-view-card/product-view-card.component';

@NgModule({
    declarations: [
        ProductViewComponent,
        ProductViewCardComponent
    ],
    imports: [CommonModule],
    exports: [
        ProductViewComponent,
        ProductViewCardComponent
    ],
    providers: [],
})
export class ProductViewModule { }