import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() isAdmin;
  @Input() group;
  @Input() description;
  
  constructor() { }

  ngOnInit() {
  }
  keydownDescrInput(){}
  addNewDescrLine(){}
  blurDescrInput(){}
}
