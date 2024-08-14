import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs';
import { AppService } from '../services/app.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  activeTab: string = 'applications';
  searchQuery: string = '';
  deals: any[] = [];
  totalRecords: number = 0; 
  isShowTable:boolean=false;

  constructor(private appService:AppService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  // onDateChange(event: MatDatepickerInputEvent<Date>) {
  //   const selectedDate = event.value;
  //   if (selectedDate) {
      
  //     this.appService.getDataForDate(selectedDate).subscribe(data => {
  //       console.log(data);
       
  //     });
  //   }
  // }
  onSearch() {
    if (this.searchQuery.trim()) {
      this.appService.searchDatabyIDorName(this.searchQuery).subscribe(
        data => {
          console.log('dataaa',data);
          console.log('length' ,data.length)
          this.isShowTable=true;
          this.deals=data;
          // Handle the fetched data here
        },
        error => {
          this.isShowTable=false;
          this.snackBar.open('No results found', 'Close', {
            duration: 3000,
            
          });
        }
      );
    } else {
      this.snackBar.open('Please enter a search query', 'Close', {
        duration: 3000,
      });
    }
  }
}
