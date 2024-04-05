import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

    public product!: Product | undefined;

    constructor() { }

    ngOnInit(): void { }

}
