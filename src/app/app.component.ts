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

roleID:any;
 
  username = '';
 
 
  loginCredentials = { username: '', password: '' };



  constructor(private router:Router,private appService:AppService){}
 
  ngOnInit(){
    sessionStorage.removeItem('userRole');
    this.appService.currentVendorName.subscribe(
      name=>this.vendorName=name);
    
  }
  login() {

    this.appService.login(this.loginCredentials).subscribe(
      (response:any) => {
        console.log('res',response.roleId)
        //this.roleID=response.roleId.toString();
         this.isLoggedIn = true;
         this.username = this.loginCredentials.username;
         sessionStorage.setItem('UserRole', response.roleId);
        // console.log('ss',  sessionStorage.setItem('UserRole',response.roleId))

      },
      error => {
        alert('Invalid credentials');
      }
    );
  }

  logout() {

    this.isLoggedIn = false;
    this.username = '';
    this.vendorName = '';
    this.vendorId = '';
  }
  profile(){
    this.router.navigate(['/profile']);
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
