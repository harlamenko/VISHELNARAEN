import { Component, OnInit, Input } from '@angular/core';
import { WebStorageService } from 'src/app/main/web-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() cartLength;
  @Input() cartLinkVisible = true;
  constructor(
    public webStorageService: WebStorageService,
  ) { }

  ngOnInit() {}
}
