import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product-response.model';

@Injectable({
    providedIn: 'root'
})
export class AutoCompleteService {

    private apiUrl = 'https://dummyjson.com/products';

    constructor(
        private _httpClient: HttpClient
    ) { }

    public getProducts(term: string): Observable<ProductsResponse> {
        if (term.length >= 3) {
            return this._httpClient.get<ProductsResponse>(this.apiUrl);
        } else {
            return new Observable<ProductsResponse>(res => {
                res.next(undefined);
            });
        }
    }
}