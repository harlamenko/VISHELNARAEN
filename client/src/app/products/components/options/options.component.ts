import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  @Input() opts: any;
  @Input() name: string;
  @Input() group: FormGroup;
  
  constructor() { }

  ngOnInit() {
  }

}
