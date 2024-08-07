import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  vendorId: string | null = null;
  deals: any[] = [];

  totalRecords: number = 0; // To store the total number of records
 
  
  constructor(private appService:AppService) { }

  ngOnInit(): void 
  {
    debugger;
    this.appService.currentVendorId.subscribe(vendorId => {
      debugger;
      this.vendorId = vendorId;
      if (vendorId) {
        this.fetchDeals(vendorId);
      } else {
        this.deals = [];
      }
    });
  }
 
  fetchDeals(vendorId: string) {
    debugger;
    this.appService.getDeals(vendorId).subscribe(
      
      data => {
        debugger;
        console.log('data', data);
        this.deals = data;
        this.totalRecords = data.length;
        this.appService.changeVendorName(this.deals[0].vendorName)
        //this.deals = Array.isArray(data) ? data : [];
        console.log('this.deals', data);
      },
      error => {
        console.error('Error fetching deals', error);
      }
    );
  }
  loadDealsLazy(event: any) {
    const { first, rows } = event;
    if (this.vendorId) {
      // Fetch data for the specific page
      this.appService.getDeals(this.vendorId).subscribe(
        data => {
          this.deals = data.slice(first, first + rows);
          this.totalRecords = data.length; // Update the total number of records
        },
        error => {
          console.error('Error fetching deals', error);
        }
      );
    }
  }
  getAllApplications()
  {
    debugger;
    this.appService.getAllDeals().subscribe(
      
      data => {
        debugger;
        console.log('data', data);
        this.deals = data;
        this.totalRecords = data.length;
        //this.appService.changeVendorName(this.deals[0].vendorName)
        //this.deals = Array.isArray(data) ? data : [];
        console.log('this.deals', data);
      },
      error => {
        console.error('Error fetching deals', error);
      }
    );

  }
}
