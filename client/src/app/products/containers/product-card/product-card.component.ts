import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from 'src/app/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct, ProductFormGroupModel } from 'src/app/models/Product';
import { WebStorageService } from 'src/app/main/web-storage.service';
import { BaseService } from 'src/app/main/base.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  public nextProduct: IProduct;
  public prevProduct: IProduct;

  public mainId: number;
  public nextId: number;
  public prevId: number;

  public variantAdded = false;
  public sexesTypes: any;

  currentVariant = 0;
  choosedSizeId = 0;
  allColors: string[];
  allSizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  breadmsInfo: {
    category: string,
    sex: string,
    pName: string,
  };

  mainProductFG: FormGroup;
  private alive: Subject<void> = new Subject();

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

  get isAdmin() {
    return this.webStorageService.isAdmin;
  }

  ngOnInit() {
    if (this.isAdmin) {
      this._productService.getSexType().subscribe(sexesTypes => {
        this.sexesTypes = sexesTypes;
      });
    }

    this._route.paramMap
    .pipe(takeUntil(this.alive))
    .subscribe(
      params => {
        this.mainId = +params.get('id');
        this._productService.getProductById(this.mainId)
          .pipe(takeUntil(this.alive))
          .subscribe(
            product => {
              this.mainProductFG = new ProductFormGroupModel(product) as FormGroup;
              
              this.setBreadmsInfo();
              this._changeEditability();

              this.nextId = this.mainProductFG.get('next_id').value;
              this.prevId = this.mainProductFG.get('prev_id').value;

              if (this.nextId !== null) {
                this._productService.getProductById(this.nextId)
                .pipe(takeUntil(this.alive))
                .subscribe(
                  prod => this.nextProduct = prod,
                  errors => this.nextProduct = null
                );
              }

              if (this.prevId !== null) {
                this._productService.getProductById(this.prevId)
                  .pipe(takeUntil(this.alive))
                  .subscribe(
                  prod => this.prevProduct = prod,
                  errors => this.prevProduct = null
                );
              }

              this.getAllVariantsColors();
            }
          );
      },
      errors => console.error(errors)
    );
  }

  setBreadmsInfo() {
    this.breadmsInfo = {
      category: this.mainProductFG.get('type').value,
      sex: this.mainProductFG.get('cat').value,
      pName: this.mainProductFG.get('rus_name').value,
    }
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
  
  selectColorOfVariant(variantIndex: number) {
    if (!this.variantAdded) {
      this.currentVariant = variantIndex;
      this.chooseSizeId(0, true);
    }
  }
  chooseSizeId(i, findExisted = false) {
    if (this.isExistedSize(i)) {
      this.choosedSizeId = i;
    } else {
      if (!findExisted) { return; }
      let idx = 0;
      while(!this.isExistedSize(idx) && idx < this.allSizes.length){
        idx++;
      }
      this.choosedSizeId = this.isExistedSize(idx) ? idx : null;
    }
  }

  isExistedSize(i) {
    const sizes = this.mainProductFG.get('variants').value[this.currentVariant].sizes;

    return sizes.indexOf(this.allSizes[i]) !== -1;
  }

  getAllVariantsColors() {
    this.allColors = [];
    this.mainProductFG.get('variants').value.forEach(variant => {
      this.allColors.push(variant.color);
    });
  }

  addToCart() {
    const obj = {
      id: this.mainProductFG.get('id').value,
      rus_name: this.mainProductFG.get('rus_name').value,
      en_name: this.mainProductFG.get('en_name').value,
      price: this.mainProductFG.get('price').value,
      photo: this.mainProductFG.get('variants').value[this.currentVariant].photo,
      size: this.mainProductFG.get('variants').value[this.currentVariant].sizes[this.choosedSizeId],
      color: this.mainProductFG.get('variants').value[this.currentVariant].color,
    };
    this.webStorageService.storeToLocal('cart', obj);
  }


  toggleSize(size, i) {
    //TODO: вынести текущий вариант в метод\динамич свойство
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

  addNewDescrLine(e) {
    const val = e.target.value;
    if (val.length) {
      // this.webStorageService.lang === 'ru' ? this.mainProduct.rus_descr.push(val) : this.mainProduct.en_descr.push(val);
      (this.mainProductFG.get('rus_descr') as FormArray).push(this.fb.control(val));
      e.target.value = '';
    }
  }

  blurDescrInput(i, e) {
    const val = e.target.value;
    if (!val.length) {
      (this.mainProductFG.get('rus_descr') as FormArray).removeAt(i);
    }
  }

  keydownDescrInput(e) {
    if (e.key !== 'Enter')  { return; }

    if (e.target.id === 'newLineInput') {
      this.addNewDescrLine(e);
      return;
    }
    const nextLine = e.target.parentElement.nextElementSibling;
    if (nextLine) {
      nextLine.firstElementChild.focus();
    }
  }

  updateProduct() {
    if (this.variantAdded) {
      this.baseService.popup.open('Редактирование не окончено!', null, null, true);
      return;
    }

    const validationMessages: string[] = this._productService.collectValidationMessages(this.mainProductFG);

    if (!this.mainProductFG.valid) {
      this.baseService.popup.open(validationMessages, null, null, true);
      return;
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
    this._productService.deleteProductById(this.mainId).subscribe(
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