import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';






export interface Applicant {
  applicantId: number,
    vendorId: number,
    applicant1: string,
    email: string,
    phone:number,
    dateOfBirth: Date,
    gender: string,
    maritalStatus: string,
    occupationType: string,
    houseNo: string,
    city: string,
    district: string,
    state: string,
    landmark: string,
    pincode: number,
    country: string
   
}

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent implements OnInit {




  showApplicants: boolean = false;

  applicants: Applicant[] = [];
  applicantId:number=0
  applicant1: string = '';
  dateOfBirth: string='' ;
  gender: string = '';
  maritalStatus: string = '';
  occupationType: string = '';
  email: string = '';
  phone: string = '';
  houseNo: string = '';
  city: string = '';
  district: string = '';
  state: string = '';
  landmark: string = '';
  pincode: string = '';
  country: string = '';
  loanAmount:string='';
  loanTerm:string='';
  interestRate:string='';
  monthlyPayment:string='';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Applicant>(this.applicants);

  
  // applicants: MatTableDataSource<any> = new MatTableDataSource([]);
 
 
  displayedColumns: string[] = ['applicantName', 'email','occupationType','phone','actions'];

  vendors: any[] = []; 
  selectedVendorId: string | null = null;

  constructor(private fb: FormBuilder,private appService:AppService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadVendors();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  onSubmit(form: NgForm): void {
    if (form.valid) {
      const newApplicant = {
        applicant1: this.applicant1,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
        maritalStatus: this.maritalStatus,
        occupationType: this.occupationType,
        email: this.email,
        phone: this.phone.toString(),
        houseNo: this.houseNo,
        city: this.city,
        district: this.district,
        state: this.state,
        landmark: this.landmark,
        pincode: this.pincode.toString(),
        country: this.country,
        applicantId:this.applicantId,
        vendorId:this.selectedVendorId,
        loanAmount:this.loanAmount.toString(),
        loanTerm:this.loanTerm.toString(),
        interestRate:this.interestRate.toString(),
        monthlyPayment:this.monthlyPayment.toString()

      };
debugger;
      this.appService.addApplicant(newApplicant).subscribe(
        (response) => {
          debugger;
          this.snackBar.open('Applicant added successfully!', 'Close', {
            duration: 3000
          });
          form.resetForm();
        },
        (error) => {
          this.snackBar.open('Failed to add applicant. Please try again.', 'Close', {
            duration: 3000
          });
          console.error('Error adding applicant:', error);
        }
      );
    }
  }
  loadVendors(): void {
    this.appService.getVendors().subscribe(
      (data) => {
        console.log('vendor',data)
        this.vendors = data;
      },
      (error) => {
        console.error('Error fetching vendors', error);
      }
    );
  }
  
  toggleApplicants(): void {
    this.showApplicants = !this.showApplicants;
    if (this.showApplicants) {
       this.loadApplicants(); 
    }
  }

  loadApplicants(): void {
    this.appService.getAllApplicants().subscribe(
      (data) => {
        this.applicants = data;
        this.dataSource.data = this.applicants; 
        this.dataSource.paginator = this.paginator; 
      },
      (error) => {
        console.error('Error fetching applicants', error);
      }
    );
  }
  deleteApplicant(applicant: any) {
    console.log('appDelete',applicant)
    if (confirm(`Are you sure you want to delete ${applicant.applicant1} ?`)) {
      debugger
      
      this.appService.deleteApplicant(applicant.applicantId).subscribe(() => {
        this.loadApplicants(); 
      });
    }
  }

}
