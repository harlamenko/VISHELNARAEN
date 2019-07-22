import { Component, OnInit, ContentChild } from '@angular/core';
import { WebStorageService } from 'src/app/main/web-storage.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(
    public webStorageService: WebStorageService,
  ) { }

  ngOnInit() {}
}
