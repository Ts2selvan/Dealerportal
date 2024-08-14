import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

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
  applicationsSent:any=0;
  contractsPending:any=0;
  contractsFunded:any=0;
  totalPaymentsToDealer:any=0;

  totalRecords: number = 0; 
 
  
  constructor(private appService:AppService,private cdr: ChangeDetectorRef,private router:Router) { }

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
  onRangeChange(checked:any): void {
 if(checked ==='monthToDate'){
this.selectedRange='monthToDate';
 }
 else if(checked==='last30Days'){
  this.selectedRange='last30Days';
 }
     //this.selectedRange = checked ?'monthToDate': 'last30Days' ;
    
    this.fetchDeals(this.vendorIdForDate);
  }
 
  fetchDeals(vendorId: string) {
 


    const now = new Date();
    let startDate: Date;
    let startDate1: Date;
    let endDate: Date = new Date();
    this.applicationsSent=null;
    this.contractsPending=null;
    this.contractsFunded=null;
    this.totalPaymentsToDealer=null;
    this.cdr.detectChanges();

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
          }).length;

          this.contractsPending = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate && dealDate <= endDate && deal.status ==='Pending';
          }).length;

          this.contractsFunded = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate && dealDate <= endDate && deal.status ==='CreditFunded';
          }).length;

          this.totalPaymentsToDealer = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate && dealDate <= endDate && deal.status ==='TotallyCredited';
          }).length;


        } else if (this.selectedRange === 'last30Days') {
        
          startDate1 = new Date();
          startDate1.setDate(now.getDate() - 30); // Last 30 days

         // startDate = new Date(now.getFullYear(), now.getMonth(), 1); 

          this.applicationsSent = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate1 && dealDate <= endDate && deal.status ==='Approved';
          }).length;// Start of the current month

          this.contractsPending = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate1 && dealDate <= endDate && deal.status ==='Pending';
          }).length;// Start of the current month

          this.contractsFunded = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate1 && dealDate <= endDate && deal.status ==='CreditFunded';
          }).length;// Start of the current month

          this.totalPaymentsToDealer = this.deals.filter(deal => {
            const dealDate = new Date(deal.applicantDate);
            return dealDate >= startDate1 && dealDate <= endDate && deal.status ==='TotallyCredited';
          }).length;// Start of the current month
        }
        
       
       
        this.cdr.detectChanges();

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
    this.router.navigate(['/deals']);
    // this.appService.getAllDeals().subscribe(
      
    //   data => {
    //     debugger;
    //     console.log('data', data);
    //     this.deals = data;
    //     this.totalRecords = data.length;
    //     this.appService.changeVendorName('0')
    //     //this.deals = Array.isArray(data) ? data : [];
    //     console.log('this.deals', data);
    //   },
    //   error => {
    //     console.error('Error fetching deals', error);
    //   }
    // );

  }
}
