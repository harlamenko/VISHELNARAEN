import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public clothes;
  constructor() { }

  ngOnInit() {
    this.clothes = [1, 2, 3, 4, 1];
  }

}
