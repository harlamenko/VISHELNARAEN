import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { takeUntil, pluck, map, tap, take, switchMap, flatMap, switchMapTo, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/products/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, IProduct, ProductFormGroupModel } from 'src/app/models/Product';
import { WebStorageService } from 'src/app/main/web-storage.service';
import { BaseService } from 'src/app/main/base.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subject, Observable, of, from, BehaviorSubject } from 'rxjs';
import { isNull } from 'util';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  private alive = new Subject();

  nextProduct: IProduct;
  prevProduct: IProduct;
  isCreating = false;
  sexesTypes: any;
  currentVariant = 0;
  choosedSizeId = 0;
  allSizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  mainProductFG: FormGroup;
  isProductNotFound: boolean;
  isVisibleColorPicker$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  newPhoto: string;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    public webStorageService: WebStorageService,
    public baseService: BaseService,
    public fb: FormBuilder
  ) {}

  get currentVariantFormGroup() {
    const variants = this.mainProductFG.get('variants') as FormArray;
    return variants.length ? <FormGroup>variants.controls[this.currentVariant] : null;
  }

  get description() {
    return this.mainProductFG.get('rus_descr') as FormArray;
  }

  get variants() {
    return this.mainProductFG.get('variants') as FormArray;
  }

  get currentVariantSizes() {
    return this.currentVariantFormGroup ? this.currentVariantFormGroup.value.sizes : [];
  }

  get allColors() {
    return this.variants.value.map(variant => variant.color);
  }

  get isAdmin() {
    return this.webStorageService.isAdmin;
  }

  ngOnInit() {
    if (this.isAdmin) {
      this._productService.getSexType().pipe(takeUntil(this.alive)).subscribe(sexesTypes => {
        this.sexesTypes = sexesTypes;
      });
    }
    if (this._route.snapshot.data.create) {
      this.prepareForCreating();
    } else {
      this._route.paramMap.pipe(
        takeUntil(this.alive),
      ).subscribe(params => {
        const id = +params.get('id');
        this._getMainProduct(id)
          .pipe(takeUntil(this.alive))
          .subscribe(this._getSiblingProducts.bind(this));
      });
    }
  }

  private _getSiblingProducts({next_id: nextId, prev_id: prevId}) {
    this._getSiblingProduct(nextId)
      .pipe(takeUntil(this.alive))
      .subscribe(
        nextProduct => this.nextProduct = nextProduct
      );
    this._getSiblingProduct(prevId)
      .pipe(takeUntil(this.alive))
      .subscribe(
        prevProduct => this.prevProduct = prevProduct
      );
  }

  prepareForCreating() {
    this.mainProductFG = <FormGroup>new ProductFormGroupModel(new Product);
    this.isCreating = true;
  }


  private _getSiblingProduct(id: number): Observable<IProduct> {
    if (!isNull(id)) {
      return this._productService.getProductById(id).pipe(takeUntil(this.alive));
    } else {
      return of(null);
    }
  }

  private _getMainProduct(id: number): Observable<IProduct> {
    return this._productService.getProductById(id).pipe(
      takeUntil(this.alive),
      tap(() => { this.isProductNotFound = false; }),
      tap(product => this._handleResponseWithMainProduct(product)),
      catchError(e => {
        if (e.status === 404) {
          this.isProductNotFound = true;
        }
        return of(e);
      })
    )
  }

  private _handleResponseWithMainProduct(product: IProduct): void {
    this.mainProductFG = <FormGroup>new ProductFormGroupModel(product);
    this._changeEditability();
    this.findFirstExistedSize();
  }

  private _changeEditability() {
    if (this.isAdmin) { return; }

    this.mainProductFG.get('rus_name').disable();
    this.mainProductFG.get('rus_title').disable();
    this.mainProductFG.get('price').disable();

    this.description.controls.forEach(control => {
      control.disable();
    });
  }

  private _normalizeProductInfo() {
    const {en_name, en_title, price} = this.mainProductFG.controls;
    if (!en_name.value) {
      en_name.setValue('no name');
    }
    if (!en_title.value) {
      en_title.setValue('no title');
    }
    if (price.value) {
      price.setValue(+price.value);
    }
  }

  selectColorOfVariant(variantIndex: number): void {
    if (this.currentVariant === variantIndex || this.isVisibleColorPicker$.getValue()) {
      return;
    }

    this.currentVariant = variantIndex;
    this.findFirstExistedSize();
  }

  findFirstExistedSize(): void {
    const size = this.allSizes.find(s => this.isExistedSize(s));
    this.choosedSizeId = this.allSizes.indexOf(size);
  }

  chooseSizeId(size: string) {
    if (this.isExistedSize(size)) {
      this.choosedSizeId = this.allSizes.indexOf(size);
    }
  }

  isExistedSize(size: string): boolean {
    return this.currentVariantSizes.indexOf(size) !== -1;
  }

  addToCart() {
    const variants = this.mainProductFG.get('variants').value
    const obj = {
      id: this.mainProductFG.get('id').value,
      rus_name: this.mainProductFG.get('rus_name').value,
      en_name: this.mainProductFG.get('en_name').value,
      price: this.mainProductFG.get('price').value,
      photo: variants[this.currentVariant].photo,
      size: variants[this.currentVariant].sizes[this.choosedSizeId],
      color: variants[this.currentVariant].color,
    };
    this.webStorageService.storeToLocal('cart', obj);
  }

  handleChoosedColor(color: string) {
    const varFG: FormGroup = ProductFormGroupModel.makeVariantFG(this.newPhoto, color, this.allSizes);

    
    this.variants.push(varFG);
    this.currentVariant = this.variants.value.length - 1;
    this.isVisibleColorPicker$.next(false);
  }

  handleNewPhoto(base64: string) {
    this.isVisibleColorPicker$.next(true);
    this.newPhoto = base64;
  }

  deleteCurrentVariant() {
    this.variants.removeAt(this.currentVariant);
    this.currentVariant = 0;
  }
  toggleSize(size, i) {
    const sizes = (<any>this.mainProductFG.get('variants')).controls[this.currentVariant].controls["sizes"];
    const idx = i ? i : sizes.value.indexOf(size);

    if (idx !== -1){
      sizes.removeAt(idx);
    } else {
      sizes.push(this.fb.control(size));
    }
    this.choosedSizeId = idx;
  }

  findPos(obj) {
    let current_left = 0, current_top = 0;
    if (obj.offsetParent) {
        do {
            current_left += obj.offsetLeft;
            current_top += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return {x: current_left, y: current_top};
    }
    return undefined;
  }

  blurDescrInput(i, e) {
    const val = e.target.value;
    if (!val.length) {
      (this.mainProductFG.get('rus_descr') as FormArray).removeAt(i);
    }
  }

  addLineToDescription(line: string) {
      // this.webStorageService.lang === 'ru' ? this.mainProduct.rus_descr.push(line) : this.mainProduct.en_descr.push(line);
      (this.mainProductFG.get('rus_descr') as FormArray).push(this.fb.control(line));
  }

  deleteLineOfDescription(index: number) {
    (this.mainProductFG.get('rus_descr') as FormArray).removeAt(index);
  }

  updateProduct() {
    if (this.isVisibleColorPicker$.getValue()) {
      this.baseService.popup.open('Редактирование не окончено!', null, null, true);
    } else if (!this.mainProductFG.valid) {
      const validationMessages: string[] = this._productService.collectValidationMessages(this.mainProductFG);
      this.baseService.popup.open(validationMessages, null, null, true);
    } else {
      this._productService.updateProduct(this.mainProductFG.value).subscribe(
        res => {
          if (res.status === 'ok') {
            this.baseService.popup.open('Информация о продукте успешно обновлена.', null, null, true);
          } else {
            this.baseService.popup.open('Ошибка! Информация о продукте не обновлена.', null, null, true);
          }
        },
        err => {
          this.baseService.popup.open('Приносим извенения, серверная ошибка.', null, null, true);
        }
      );
    }
  }

  public deleteProduct() {
    const id = this.mainProductFG.get('id').value;

    this._productService.deleteProductById(id).subscribe(
      res => {
        if (res.status) {
          this.baseService.popup.open('Продукт успешно удален.', null, null, true);
        } else {
          this.baseService.popup.open('Ошибка! Продукт не был удален.', null, null, true);
        }
      },
      err => {
        this.baseService.popup.open('Приносим извинения, серверная ошибка.', null, null, true);
      }
    );
  }

  addProduct() {
    this._normalizeProductInfo();

    if (this.isVisibleColorPicker$.getValue()) {
      this.baseService.popup.open('Редактирование не окончено!', null, null, true);
    } else if (!this.mainProductFG.valid) {
      const validationMessages: string[] = this._productService.collectValidationMessages(this.mainProductFG);
      this.baseService.popup.open(validationMessages, null, null, true);
    } else {
      this._productService.addProduct(this.mainProductFG.value).subscribe(
        res => {
          if (res.status === 'ok' || res.status) {
            this.baseService.popup.open('Новый продукт успешно добавлен.', null, null, true);
            this.clearProduct();
          } else {
            this.baseService.popup.open('Ошибка! продукт не добавлен.', null, null, true);
          }
        },
        err => {
          this.baseService.popup.open('Приносим извенения, серверная ошибка.', null, null, true);
        }
      );
    }
  }

  clearProduct() {
    this.prepareForCreating();
  }

  ngOnDestroy() {
    this.alive.next();
    this.alive.complete();
  }
}
