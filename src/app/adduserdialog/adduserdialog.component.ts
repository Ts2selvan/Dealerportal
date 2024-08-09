import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adduserdialog',
  templateUrl: './adduserdialog.component.html',
  styleUrls: ['./adduserdialog.component.scss']
})
export class AdduserdialogComponent implements OnInit {
  addUserForm: FormGroup;
  roles: string[] = ['Admin', 'User', 'Guest']; 

  constructor(    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdduserdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      this.addUserForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        role: ['', Validators.required]
      });
     }

  ngOnInit(): void {
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // if (this.addUserForm.valid) {
    //   this.dialogRef.close(this.addUserForm.value); 
    // }
  }
}
