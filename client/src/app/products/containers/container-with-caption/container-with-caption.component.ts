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
  maxPrice = 999999999;

  constructor(public webStorageService: WebStorageService) { }

  ngOnInit() {
  }

  priceChanged(price) {
    if (price > this.maxPrice) {
      this.group.patchValue({price: this.maxPrice});
    }
  }
}
