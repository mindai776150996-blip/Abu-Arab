
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Product {
  name: string;
  description: string;
  images: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.sheetbest.com/sheets/8ce79d49-7891-4dbd-892d-3dfd44809baa';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching products:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
}
