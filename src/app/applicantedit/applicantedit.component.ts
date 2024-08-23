import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-applicantedit',
  templateUrl: './applicantedit.component.html',
  styleUrls: ['./applicantedit.component.scss']
})
export class ApplicanteditComponent implements OnInit {
  editApplicantForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ApplicanteditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {     this.editApplicantForm = this.fb.group({
    applicant1: [data.applicant1, Validators.required],
    dateOfBirth: [data.dateOfBirth, Validators.required],
    gender: [data.gender, Validators.required],
    maritalStatus: [data.maritalStatus, Validators.required],
    occupationType: [data.occupationType, Validators.required],
    email: [data.email, [Validators.required, Validators.email]],
    phone: [data.phone, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    houseNo: [data.houseNo, Validators.required],
    city: [data.city, Validators.required],
    district: [data.district, Validators.required],
    state: [data.state, Validators.required],
    landmark: [data.landmark, Validators.required],
    pincode: [data.pincode, Validators.required],
    country: [data.country, Validators.required]
  });}

  ngOnInit(): void {
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editApplicantForm.valid) {
      const formData = { 
        ...(this.data || {}), 
        ...this.editApplicantForm.value 
      };
      this.dialogRef.close(formData);
    }
  }
}
