import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private vendorIdSource = new BehaviorSubject<string | null>(null);
  currentVendorId = this.vendorIdSource.asObservable();

  private VendorNameSource = new BehaviorSubject<string | null>(null);
  currentVendorName = this.VendorNameSource.asObservable();
 
  constructor(private http:HttpClient) { }

  changeVendorName(vendorName: string) {
    debugger;
    this.VendorNameSource.next(vendorName);
  }
  setVendorId(vendorId: string) {
    this.vendorIdSource.next(vendorId); 

  }
  changeVendorId(vendorId: string) {
    this.vendorIdSource.next(vendorId);
  }
  login(user:any){
    return this.http.post(`${environment.apiUrlLogin}`, user);
  } 

  getDeals(vendorId: string): Observable<any[]> {
    
    return this.http.get<any[]>(`${environment.apiUrlforGet}/${vendorId}`);
  }
  getVendorName(vendorId: string): Observable<string> {
    
    return this.http.get<any>(`${environment.apiUrlforGet}/${vendorId}`).pipe(
      map(response => response.vendorName));
  }
}
