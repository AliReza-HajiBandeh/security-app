import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rbc-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  title = 'سامانه مدیریت کاربران';
  constructor() { }

  ngOnInit(): void {
  }

}
