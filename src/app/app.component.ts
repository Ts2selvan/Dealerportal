import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dealerportal';
  constructor(private router:Router){this.router.navigate(['/dashboard']);}
  // navigateTo(route:string):void{
  //   debugger;

  // }
}
