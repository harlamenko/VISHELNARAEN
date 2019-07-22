import { Component, OnInit, Input } from '@angular/core';
import { WebStorageService } from 'src/app/main/web-storage.service';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss']
})
export class SizesComponent implements OnInit {
  allSizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  @Input() currentVariant;
  constructor(public webStorageService: WebStorageService) { }

  ngOnInit() {
  }


}
