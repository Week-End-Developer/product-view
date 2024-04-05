import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutoCompleteModule } from '../../../shared/components/autocomplete/autocomplete.module';
import { ProductViewModule } from '../../../shared/components/product-view/product-view.module';
import { ProductViewComponent } from '../../../shared/components/product-view/product-view/product-view.component';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteService } from '../../../shared/services/autocomplete.service';
import { AutoCompleteComponent } from '../../../shared/components/autocomplete/autocomplete/autocomplete.component';
import { Product } from '../../../shared/models/product.model';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ProductViewModule, AutoCompleteModule, HttpClientModule],
    providers: [AutoCompleteService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    constructor(
    ) { }

    @ViewChild('autoComplete') autoCompleteComponent!: AutoCompleteComponent;
    @ViewChild('productContainer', { read: ViewContainerRef, static: true }) productContainer!: ViewContainerRef;

    private productComponent: ComponentRef<ProductViewComponent> | undefined;

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this.onAutoCompleteListen();
    }

    onAutoCompleteListen() {
        this.autoCompleteComponent.selectedProduct$.subscribe((product: Product | undefined) => {
            if (product) {
                this.productComponent = this.productContainer.createComponent(ProductViewComponent);
                (this.productComponent.instance as ProductViewComponent).product = product;
            } else {
                this.productComponent?.destroy();
            }
        })
    }

}

