import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartClothesComponent } from './cart-clothes.component';

describe('CartClothesComponent', () => {
  let component: CartClothesComponent;
  let fixture: ComponentFixture<CartClothesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartClothesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
