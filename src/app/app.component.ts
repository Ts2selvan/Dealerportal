import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dealerportal';

  vendorId: any = '';
  // vendorName:  any[] = [];
  vendorName: string | null = null;
  constructor(private router:Router,private appService:AppService){this.router.navigate(['/dashboard']);}
 
  ngOnInit(){
    this.appService.currentVendorName.subscribe(
      name=>this.vendorName=name);
    
  }
 

  updateVendorId() {
    this.appService.changeVendorId(this.vendorId);
  }
  switchVendor() {
    this.appService.setVendorId(this.vendorId);
    debugger
    this.appService.getVendorName(this.vendorId).subscribe(
      vendorName => {
        debugger
        this.vendorName = vendorName;
      },
      error => {
        console.error('Error fetching vendor name', error);
        this.vendorName = null;
      }
    );
  }
}
