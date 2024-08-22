import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  roleId: number;
  role: string; 
} 

@Injectable({
  providedIn: 'root'
})


export class AppService {
  private vendorIdSource = new BehaviorSubject<string | null>(null);
  currentVendorId = this.vendorIdSource.asObservable();

  private VendorNameSource = new BehaviorSubject<string | null>(null);
  currentVendorName = this.VendorNameSource.asObservable();

 
  constructor(private http:HttpClient ) { }

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
  getAllDeals(){
    return this.http.get<any[]>(`${environment.apiUrlforGetAll}`);
  }
  // searchDatabyIDorName(query:any): Observable<any[]> {
    
  //   return this.http.get<any[]>(`${environment.apiUrlforGetApplicationsByNameId}/${query}`);
  // }
  searchDatabyIDorName(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<any>(`${environment.apiUrlforGetApplicationsByNameId}`, { params });
}
// getDataForDate(date:string): Observable<any>{
//   //const params = new HttpParams().set('searchTerm', date);
//   const formattedDate  = this.datePipe.transform(date, 'yyyy-MM-dd');
//   // const params = new HttpParams().set('date', formattedDate );
//   let params = new HttpParams();
//   if (formattedDate) {
//     params = params.set('date', formattedDate);
//   }
  
//   return this.http.get<any>(`${environment.apiUrlforGetApplicationsByDate}`, {params});
// }
addUser(user: any): Observable<any> {
  return this.http.post<any>(`${environment.apiUrlforAddUser}`, user);
}
deleteUser(userId: number): Observable<void> {
  return this.http.delete<void>(`${environment.apiUrlforDeleteUser}/${userId}`);
}
getAllUsers(): Observable<User[]> {
  return this.http.get<User[]>(`${environment.apiUrlforGetAllProfile}`);
}
updateUser(user: User): Observable<User> {
  return this.http.put<User>(`${environment.apiUrlUpdateProfile}/${user.userId}`, user);
}
addApplicant(applicant: any): Observable<any> {
  console.log('api',environment.apiUrlAddApplicant)
  console.log('data',applicant)
  return this.http.post<any>(`${environment.apiUrlAddApplicant}`, applicant);
}
getVendors(): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrlGetAllVendor}`);
}
}
