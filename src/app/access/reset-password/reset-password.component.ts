import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {
  password = '';
  passwordConfirm = '';

  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
  }
}
