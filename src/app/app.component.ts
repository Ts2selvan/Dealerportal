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
  vendorName:any='';
  isLoggedIn: boolean = false;


 
  username = '';
 
 
  loginCredentials = { username: '', password: '' };



  constructor(private router:Router,private appService:AppService){}
 
  ngOnInit(){
    this.appService.currentVendorName.subscribe(
      name=>this.vendorName=name);
    
  }
  login() {
   
    if (this.loginCredentials.username === 'admin' && this.loginCredentials.password === '123') {
      this.isLoggedIn = true;
      this.username='Selvan R'
      //this.username = this.loginCredentials.username;
      // Set vendorName or other details as needed
      //this.vendorName = 'Vendor Name';
    } else {
      alert('Invalid credentials');
    }
  }

  logout() {

    this.isLoggedIn = false;
    this.username = '';
    this.vendorName = '';
    this.vendorId = '';
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
