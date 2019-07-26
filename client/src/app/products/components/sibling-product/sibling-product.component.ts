import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sibling-product',
  templateUrl: './sibling-product.component.html',
  styleUrls: ['./sibling-product.component.scss']
})
export class SiblingProductComponent {
  @Input() product: any;
}
