import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  vendorId: string | null = null;
  vendorIdForDate:any
  deals: any[] = [];
  selectedRange: string = 'monthToDate';
  filteredStats: any;
  applicationsSent:number=0;
  contractsPending:number=0;
  contractsFunded:number=0;
  totalPaymentsToDealer:number=0;

  totalRecords: number = 0; // To store the total number of records
 
  
  constructor(private appService:AppService) { }

  ngOnInit(): void 
  {
    debugger;
    this.appService.currentVendorId.subscribe(vendorId => {
      debugger;
      this.vendorId = vendorId;
      this.vendorIdForDate=vendorId
      if (vendorId) {
        this.fetchDeals(vendorId);
      } else {
        this.deals = [];
      }
    });
  }
  onRangeChange(checked: boolean): void {
    this.selectedRange = checked ? 'last30Days' : 'monthToDate';
    
    this.fetchDeals(this.vendorIdForDate);
  }
 
  fetchDeals(vendorId: string) {
 


    const now = new Date();
    let startDate: Date;
    let endDate: Date = new Date();


    this.appService.getDeals(vendorId).subscribe(
      
      data => {
        debugger;
        console.log('data', data);
        this.deals = data;
        this.totalRecords = data.length;
        this.appService.changeVendorName(this.deals[0].vendorName)
      
        console.log('this.deals', data);
        this.applicationsSent=0;
        if (this.selectedRange === 'monthToDate') {
          startDate = new Date(now.getFullYear(), now.getMonth(), 1); 

          this.applicationsSent = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate && dealDate <= endDate && deal.status ==='Approved';
          }).length;// Start of the current month

          this.contractsPending = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate && dealDate <= endDate && deal.status ==='Pending';
          }).length;// Start of the current month

          this.contractsFunded = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate && dealDate <= endDate && deal.status ==='CreditFunded';
          }).length;// Start of the current month

          this.totalPaymentsToDealer = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate && dealDate <= endDate && deal.status ==='TotallyCredited';
          }).length;// Start of the current month


        } else if (this.selectedRange === 'last30Days') {
          startDate = new Date();
          startDate.setDate(now.getDate() - 30); // Last 30 days

          startDate = new Date(now.getFullYear(), now.getMonth(), 1); 

          this.applicationsSent = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate && dealDate <= endDate && deal.status ==='Approved';
          }).length;// Start of the current month

          this.contractsPending = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate && dealDate <= endDate && deal.status ==='Pending';
          }).length;// Start of the current month

          this.contractsFunded = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate && dealDate <= endDate && deal.status ==='CreditFunded';
          }).length;// Start of the current month

          this.totalPaymentsToDealer = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate && dealDate <= endDate && deal.status ==='TotallyCredited';
          }).length;// Start of the current month
        }
        
       
       


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
          //this.totalRecords = data.length; 
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
        this.appService.changeVendorName('0')
        //this.deals = Array.isArray(data) ? data : [];
        console.log('this.deals', data);
      },
      error => {
        console.error('Error fetching deals', error);
      }
    );

  }
}
