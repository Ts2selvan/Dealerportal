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
  title:string;

  constructor(    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdduserdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
      
      this.title = data.email? 'Edit User' : 'Add New User'  ;
      this.addUserForm = this.fb.group({
        email: [data.email, [Validators.required, Validators.email]],
        firstName: [data.firstName, Validators.required],
        lastName: [data.lastName, Validators.required],
        username: [data.username, Validators.required],
        mobileNumber: [data.mobileNumber, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        role: [ data.roleId === 1 ? 'Admin' : 
          data.roleId === 2 ? 'User' : 
          data.roleId === 3 ? 'Guest' : '', Validators.required]
      });
     }

  ngOnInit(): void {
    
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    debugger;
    // if (this.addUserForm.valid) {
    //   this.dialogRef.close({...this.data,...this.addUserForm.value}); 
    // }
    if (this.addUserForm.valid) {
      const formData = { 
        ...(this.data || {}), 
        ...this.addUserForm.value 
      };
      this.dialogRef.close(formData);
    }
  }
}
