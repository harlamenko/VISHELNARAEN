import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { takeUntil, pluck, map, tap, take, switchMap, flatMap, switchMapTo, catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct, ProductFormGroupModel } from 'src/app/models/Product';
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
  public nextProduct: IProduct;
  public prevProduct: IProduct;
  public variantAdded = false;
  public sexesTypes: any;
  currentVariant = 0;
  choosedSizeId = 0;
  allSizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  mainProductFG: FormGroup;

  private alive: Subject<void> = new Subject();
  isProductNotFound: boolean;
  isVisibleColorPicker$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  newPhoto: WindowBase64;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    public webStorageService: WebStorageService,
    public baseService: BaseService,
    public fb: FormBuilder
  ) {}

  get currentVariantFormGroup() {
    const variants = this.mainProductFG.get('variants') as FormArray;
    return variants.length ? variants.controls[this.currentVariant] : null;
  }

  get description() {
    return this.mainProductFG.get('rus_descr') as FormArray;
  }

  get variants() {
    return this.mainProductFG.get('variants') as FormArray;
  }

  get currentVariantSizes() {
    return this.mainProductFG.get('variants').value[this.currentVariant].sizes;
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

    this._route.paramMap.pipe(
      takeUntil(this.alive),
      pluck('params', 'id'),
      map(id => +id)
    ).subscribe(id => {
      // происходит отписка при ошибке на бэке, поэтому нельзя через switchMap
      this._getMainProduct(id).subscribe();
    });
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
      }),
      tap(({next_id: nextId, prev_id: prevId}) => {
        this.nextProduct = <IProduct>{id: nextId};
        this.prevProduct = <IProduct>{id: prevId};
      }),
      switchMap(() => this._getSiblingProduct(this.nextProduct.id)),
      tap(nextProduct => this.nextProduct = nextProduct),
      switchMap(() => this._getSiblingProduct(this.prevProduct.id)),
      tap(prevProduct => this.prevProduct = prevProduct)
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

  selectColorOfVariant(variantIndex: number): void {
    if (this.currentVariant === variantIndex || this.variantAdded) {
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
    const variants: FormArray = this.mainProductFG.get('variants') as FormArray;
    const varFG: FormGroup = ProductFormGroupModel.makeVariantFG(this.newPhoto, color, this.allSizes);

    variants.push(varFG);
    this.currentVariant = variants.length - 1;
    this.isVisibleColorPicker$.next(false);
  }

  handleNewPhoto(base64: WindowBase64) {
    this.isVisibleColorPicker$.next(true);
    this.newPhoto = base64;
  }

  deleteCurrentVariant() {
    debugger;
    this.variants.removeAt(this.currentVariant);
    this.currentVariant = 0;
  }

  toggleSize(size, i) {
    const sizes = (<any>this.mainProductFG.get('variants')).controls[this.currentVariant].controls["sizes"];
    const idx = sizes.value.indexOf(size);

    if (idx !== -1){
      sizes.removeAt(idx);
    } else {
      sizes.push(this.fb.control(size));
    }
    this.choosedSizeId = i;
  }

  findPos(obj){
    let current_left = 0, current_top = 0;
    if (obj.offsetParent){
        do{
            current_left += obj.offsetLeft;
            current_top += obj.offsetTop;
        }while(obj = obj.offsetParent);
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
    if (this.variantAdded) {
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
        this.baseService.popup.open('Приносим извенения, серверная ошибка.', null, null, true);
      }
    );
  }

  ngOnDestroy() {
    this.alive.next();
    this.alive.complete();
  }
}
