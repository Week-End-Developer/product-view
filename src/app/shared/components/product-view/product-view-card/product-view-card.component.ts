import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
    selector: 'app-product-view-card',
    templateUrl: './product-view-card.component.html',
    styleUrls: ['./product-view-card.component.scss']
})
export class ProductViewCardComponent implements OnInit {

    @Input() product : Product | undefined;
    
    constructor() { }

    ngOnInit(): void { }
}
