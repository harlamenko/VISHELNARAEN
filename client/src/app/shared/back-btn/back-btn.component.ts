import { Component, OnInit } from '@angular/core';
import { WebStorageService } from 'src/app/main/web-storage.service';

@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrls: ['./back-btn.component.scss']
})
export class BackBtnComponent implements OnInit {

  constructor(
    public webStorageService: WebStorageService
  ) { }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }
}
