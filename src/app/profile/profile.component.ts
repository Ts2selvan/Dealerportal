import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdduserdialogComponent } from '../adduserdialog/adduserdialog.component';
import { AppService } from '../services/app.service';
export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  roleId: number;
  role: string; 
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
  users: User[] = [];
  userRole:any;
  
  constructor(private appService:AppService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('UserRole');
   this.loadUsers();
  }
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AdduserdialogComponent, {
      width: '400px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
        this.addUser(result);
      }
    });
  }
  addUser(user: any): void {
    // Example method to handle adding the user to the backend
    this.appService.addUser(user).subscribe(
      (response) => {
        debugger
        console.log('res',response)
        this.users.push(response); // Add the new user to the list of users
      },
      (error) => {
        console.error('Error adding user', error);
      }
    );

}
deleteUser(user: User) {
  if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
    this.appService.deleteUser(user.userId).subscribe(() => {
      this.loadUsers(); 
    });
  }
}
loadUsers() {
  this.appService.getAllUsers().subscribe((data: User[]) => {
    this.users = data;
  });
}
editUser(user: User) {
  const dialogRef = this.dialog.open(AdduserdialogComponent, {
    width: '400px',
    data: user
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.appService.updateUser(result).subscribe(() => {
        this.loadUsers(); 
      });
    }
  });
}
}