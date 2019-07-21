import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/main/base.service';
import { AuthService } from 'src/app/welcome/auth.service';
import { WebStorageService } from 'src/app/main/web-storage.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  public auth = false;
  public reg = false;
  public login = '';
  public pwd = '';
  public mail = '';
  public repeatpwd = '';

  constructor(
    public baseService: BaseService,
    private _authService: AuthService,
    public webStorageService: WebStorageService
    ) { }

  ngOnInit() {
  }

  changeActions(type) {
    switch (type) {
      case 'auth':
        this.reg = false;
        this.auth = true;
        break;
      case 'reg':
        this.auth = false;
        this.reg = true;
        break;
    }
  }

  validateEmail(email) {
      const pattern  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern .test(String(email).toLowerCase());
  }

  signin() {
    let valid = true;

    valid = !!this.login.length &&
    !!this.pwd.length &&
    !!this.mail.length &&
    !!this.repeatpwd.length;

    if (!valid) {
      this.baseService.popup.open('Не все поля заполнены!', null, null, true);
      return;
    }

    valid = this.validateEmail(this.mail);

    if (!valid) {
      this.baseService.popup.open('Почта введена не правильно!', null, null, true);
      return;
    }

    valid = this.pwd.length < 6;

    if (!valid) {
      this.baseService.popup.open('Пароль должен быть больше 5 символов!', null, null, true);
      return;
    }

    valid = this.pwd === this.repeatpwd;

    if (!valid) {
      this.baseService.popup.open('Пароли не совпадают!', null, null, true);
      return;
    }

    const userData = {
      'name': this.login,
      'password': this.pwd,
      'email': this.mail
    };

    this._authService.register(userData).subscribe(
      res => {
        this.baseService.popup.open(`Добро пожаловать на раён, ${userData.name}!)`, null, null, true);
        this.logIn(false);
        this.auth = false;
        this.reg = false;
      },
      err => {
        this.baseService.popup.open('Логин занят!', null, null, true);
      }
    );
  }

  logIn(showPopUp = true) {
    let valid = true;

    valid = !!this.login.length && !!this.pwd.length;

    if (!valid) {
      this.baseService.popup.open('Не все поля заполнены!', null, null, true);
      return;
    }

    const userData = {
      'name': this.login,
      'password': this.pwd
    };

    this._authService.logIn(userData).subscribe(
      res => {
        if (showPopUp) {
          this.baseService.popup.open(`Удачи на раёне, ${this.login}!)`, null, null, true);
        }
        this.webStorageService.isAdmin = res.isAdmin;
        this.webStorageService.setToLocaleStorage('username', userData.name);
        this.auth = false;
        this.reg = false;
      },
      err => {
        this.baseService.popup.open('Логин и пароль не совпадают!', null, null, true);
      }
    );
  }

  logout() {
    this.webStorageService.isAdmin = false;
    this.webStorageService.removeFromLocalStorage('username');

    window.localStorage.setItem('cart', '[]');
    this.webStorageService.cartLength.next(0);
  }

  guest() {
    this.webStorageService.isAdmin = false;
  }

  admin() {
    this.webStorageService.isAdmin = true;
  }
}
