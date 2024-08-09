import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdduserdialogComponent } from '../adduserdialog/adduserdialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  users: any[] = [  // Example users data
    { name: 'John Doe', role: 'Developer' },
    { name: 'Jane Smith', role: 'Designer' },
  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AdduserdialogComponent, {
      width: '300px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
        this.users.push(result);
      }
    });
  }

}
