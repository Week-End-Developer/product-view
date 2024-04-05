import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsResponse } from '../../../models/product-response.model';
import { Product } from '../../../models/product.model';
import { AutoCompleteService } from '../../../services/autocomplete.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, retry, switchMap } from 'rxjs';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

    public selectedProduct$: Subject<Product | undefined> = new Subject<Product | undefined>();
    private filteredData: Product[] | undefined;
    public isSearchDisabled: boolean = false;
    public formControl = new FormControl();
    public productList: Product[] = [];
    public isLoading: boolean = false;

    constructor(
        private autoCompleteService: AutoCompleteService
    ) { }

    ngOnInit(): void {
        this.formControlListener();
    }

    private formControlListener() {
        this.formControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term) => {
                this.isLoading = true;
                if (!this.isSearchDisabled)
                    return this.autoCompleteService.getProducts(term);
                else
                    return [];
            })
        ).subscribe((data: ProductsResponse) => {
            this.isLoading = false;
            if (data && data.products) {
                this.productList = this.filter(data.products, this.formControl.value);
                this.selectedProduct$.next(undefined);
            }
            else if (!this.isSearchDisabled) this.productList = [];
        });
    }

    public onSelectProduct(product: Product) {
        this.isSearchDisabled = true;
        this.formControl.patchValue(product.title);
        this.selectedProduct$.next(product);
    }

    
    public onKeyDown() {
        this.isSearchDisabled = false;
    }

    private filter(productList: Product[], term: string) {
        this.filteredData = productList.filter(item => item.title?.toLowerCase().trim().includes(term.toLowerCase().trim())).slice(0, 10);
        return this.filteredData;
    }

    public checkNoDataVisible() {
        if (this.isLoading) return false;
        if (this.isSearchDisabled) return false;
        if (!this.formControl.value) return false;
        if (this.formControl.value?.length < 3) return false;
        if (this.filteredData && this.filteredData?.length > 0) return false;
        else return true;
    }

    // ctrl a del control
    checkModelChange(e: string) {
        if (!e) this.selectedProduct$.next(undefined);
    }
}
