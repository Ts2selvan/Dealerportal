import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';

export interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  dateOfBirth: string; 
  gender: string;
  maritalStatus: string;
  occupationType: string;
  addressId: number;
  address: any;
}

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent implements OnInit {
  applicantForm!: FormGroup;
  customer = {
    customerId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: 0,
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    occupationType: '',
    addressId: 0,
    address: {
      addressId: 0,
      houseNo: '',
      city: '',
      district: '',
      state: '',
      landmark: '',
      pincode: 0,
      country: ''
    }
  };
  customers: Customer[] = [];
  // applicants: MatTableDataSource<any> = new MatTableDataSource([]);
 
  vendors: any[] = []; // Assuming vendor data is fetched from a service
  displayedColumns: string[] = ['applicantName', 'email', 'actions'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadApplicants();
    this.loadVendors();
  }

  initializeForm() {
    // this.applicantForm = this.fb.group({
    //   applicantName: [''],
    //   email: [''],
    //   phone: [''],
    //   vendorId: [''],
    //   // Add other form controls here
    // });
  }

  loadApplicants() {
    // this.applicantService.getAllApplicants().subscribe(data => {
    //   this.applicants.data = data;
    // });
  }

  loadVendors() {
    // this.applicantService.getAllVendors().subscribe(data => {
    //   this.vendors = data;
    // });
  }

  onSubmit() {
    // if (this.applicantForm.valid) {
    //   if (this.applicantForm.value.applicantId) {
    //     this.applicantService.updateApplicant(this.applicantForm.value).subscribe(() => {
    //       this.loadApplicants();
    //     });
    //   } else {
    //     this.applicantService.addApplicant(this.applicantForm.value).subscribe(() => {
    //       this.loadApplicants();
    //     });
    //   }
    //   this.applicantForm.reset();
    // }
  }

  editApplicant(applicant: any) {
    // this.applicantForm.patchValue(applicant);
  }

  deleteApplicant(applicantId: number) {
    // this.applicantService.deleteApplicant(applicantId).subscribe(() => {
    //   this.loadApplicants();
    // });
  }
}
