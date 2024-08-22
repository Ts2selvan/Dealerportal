import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  
  // applicants: MatTableDataSource<any> = new MatTableDataSource([]);
 

  displayedColumns: string[] = ['applicantName', 'email', 'actions'];

  vendors: any[] = []; 
  selectedVendorId: string | null = null;

  constructor(private fb: FormBuilder,private appService:AppService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadVendors();
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
}
