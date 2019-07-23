import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WebStorageService } from 'src/app/main/web-storage.service';

@Component({
  selector: 'app-photo-with-caption',
  templateUrl: './photo-with-caption.component.html',
  styleUrls: ['./photo-with-caption.component.scss']
})
export class PhotoWithCaptionComponent implements OnInit {
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
