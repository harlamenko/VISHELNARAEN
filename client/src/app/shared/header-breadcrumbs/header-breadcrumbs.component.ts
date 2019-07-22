import { Component, OnInit, Input } from '@angular/core';
import { WebStorageService } from 'src/app/main/web-storage.service';

@Component({
  selector: 'app-header-breadcrumbs',
  templateUrl: './header-breadcrumbs.component.html',
  styleUrls: ['./header-breadcrumbs.component.scss']
})
export class HeaderBreadcrumbsComponent implements OnInit {
  @Input() sex: string;
  @Input() category: string;
  @Input() pName: string;

  constructor(
    public webStorageService: WebStorageService
  ) { }

  ngOnInit() {
  }

}
