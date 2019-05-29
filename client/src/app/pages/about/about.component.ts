import { Component, OnInit } from '@angular/core';
import { WebStorageService } from 'src/app/services/web-storage.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(public webStorageService: WebStorageService) { }

  ngOnInit() {
  }

}
