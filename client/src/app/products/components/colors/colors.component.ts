import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {
  @Input() allColors: string[];
  @Input() currentVariant: number;
  
  constructor() { }

  ngOnInit() {
  }
  selectColorOfVariant(i){}
}
