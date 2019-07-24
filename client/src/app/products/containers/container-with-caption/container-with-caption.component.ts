import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WebStorageService } from 'src/app/main/web-storage.service';

@Component({
  selector: 'app-container-with-caption',
  templateUrl: './container-with-caption.component.html',
  styleUrls: ['./container-with-caption.component.scss']
})
export class ContainerWithCaptionComponent implements OnInit {
  @Input() group: FormGroup;

  constructor(public webStorageService: WebStorageService) { }

  ngOnInit() {
  }
  
  keydownNamePriceCtrls(e) {
    if (e.key !== 'Enter')  { return; }

    const nextLine = e.target.nextElementSibling;
    if (nextLine) {
      nextLine.focus();
    }
  }
}
