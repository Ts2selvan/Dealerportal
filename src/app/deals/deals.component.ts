import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  activeTab: string = 'applications';
  constructor() { }

  ngOnInit(): void {
  }

}
