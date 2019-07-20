import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct, ProductFormGroupModel } from 'src/app/models/Product';
import { WebStorageService } from 'src/app/services/web-storage.service';
import { Variant } from 'src/app/models/Product';
import { BaseService } from 'src/app/services/base.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { isNull } from 'util';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public mainProduct: IProduct;
  public nextProduct: IProduct;
  public prevProduct: IProduct;

  public mainId: number;
  public nextId: number;
  public prevId: number;

  public variantAdded = false;
  public sexesTypes: any;

  public currentVariant = 0;
  public choosedSizeId = 0;
  public allColors: string[];
  public allSizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  @ViewChild('canvasForPhoto') canvasForPhoto: ElementRef;

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

  private _changeEditability() {
    if (this.isAdmin) { return; }

    this.mainProductFG.get('rus_name').disable();
    this.mainProductFG.get('rus_title').disable();
    this.mainProductFG.get('price').disable();

    this.description.controls.forEach(control => {
      control.disable();
    });
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
      id: this.mainProduct.id,
      rus_name: this.mainProduct.rus_name,
      en_name: this.mainProduct.en_name,
      price: this.mainProduct.price,
      photo: this.mainProduct.variants[this.currentVariant].photo,
      size: this.mainProduct.variants[this.currentVariant].sizes[this.choosedSizeId],
      color: this.mainProduct.variants[this.currentVariant].color
    };
    this.webStorageService.storeToLocal('cart', obj);
  }

  back() {
    window.history.back();
  }

  // циклический слайдер
  slidePhoto(side) {
    switch (side) {
      case 'right':
        this.currentVariant = (this.currentVariant + 1) % this.allColors.length;
        break;
      case 'left':
        // чтобы не уходить в индекс меньший нуля присваиваем idx индекс последнего эл, если текущий idx = 0
        this.currentVariant = this.currentVariant === 0 ? this.allColors.length - 1 : ((this.currentVariant - 1) % this.allColors.length);
        break;
    }
  }

  addPhotoVariant(e) {
    if (!e.isTrusted) { return; }

    const file: File = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      const base64Img = event.target.result;

      this.addNewVariant(base64Img);
    });

    reader.readAsDataURL(file);
  }

  addNewVariant(photo: string) {
    this.variantAdded = true;
    this.getPipette(photo);
    const variants: FormArray = this.mainProductFG.get('variants') as FormArray;
    const varFG: FormGroup = ProductFormGroupModel.makeVariantFG(photo, null, this.allSizes);

    variants.push(varFG);
    this.currentVariant = variants.length - 1;
    this.getAllVariantsColors();
  }

  delProduct() {
    const vars = this.mainProductFG.get('variants') as FormArray;
    vars.removeAt(this.currentVariant);
    this.allColors.splice(this.currentVariant, 1);
    this.currentVariant = 0;
  }

  endAddVariant() {
    const vars = this.mainProductFG.get('variants');
    if (isNull(vars.value[this.currentVariant].color)) {
      this.baseService.popup.open('Необходимо выбрать цвет товара!', null, null, true);
    } else {
      this.variantAdded = false;
    }
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

  rgbToHex(r, g, b){
    if (r > 255 || g > 255 || b > 255) {
        throw "Invalid color component";
    }
    return ((r << 16) | (g << 8) | b).toString(16);
  }

  getPipette(src) {
    const canvas = this.canvasForPhoto.nativeElement;
    canvas.width = canvas.offsetParent.offsetWidth;
    canvas.height = canvas.offsetParent.offsetHeight;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = src;
    image.onload = function() {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    const self = this;
    canvas.onclick = function(e) {
      const position = self.findPos(this);
      const x = e.pageX - position.x;
      const y = e.pageY - position.y;
      const p = ctx.getImageData(x, y, 1, 1).data;
      const hex = '#' + ('000000' + self.rgbToHex(p[0], p[1], p[2])).slice(-6);
      const variants = (self.mainProductFG.get('variants') as any).controls;
      variants[variants.length - 1].patchValue({'color': hex});
      self.getAllVariantsColors();
    };
  }

  //TODO: вынести в директиву
  addNewDescrLine(e) {
    const val = e.target.value;
    if (val.length) {
      // this.webStorageService.lang === 'ru' ? this.mainProduct.rus_descr.push(val) : this.mainProduct.en_descr.push(val);
      (this.mainProductFG.get('rus_descr') as FormArray).push(this.fb.control(val));
      e.target.value = '';
    }
  }

  //TODO: вынести в директиву
  blurDescrInput(i, e) {
    const val = e.target.value;
    if (!val.length) {
      (this.mainProductFG.get('rus_descr') as FormArray).removeAt(i);
    }
  }

  //TODO: вынести в директиву
  keydownNamePriceCtrls(e) {
    if (e.key !== 'Enter')  { return; }

    const nextLine = e.target.nextElementSibling;
    if (nextLine) {
      nextLine.focus();
    }
  }

  //TODO: вынести в директиву
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

  selectColorOfVariant(variantIndex: number) {
    if (!this.variantAdded) {
      this.currentVariant = variantIndex;
      this.chooseSizeId(0, true);
    }
  }

  ngOnDestroy() {
    this.alive.next();
    this.alive.complete();
  }
}
