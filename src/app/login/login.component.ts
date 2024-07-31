import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any
  password:any 

  constructor(private appService:AppService,private router:Router) { }

  ngOnInit(): void {
  }
  onLogin() {
    // Simulate a login process
    if (this.username === 'admin' && this.password === 'admin') {
      // Set login state
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }

}
