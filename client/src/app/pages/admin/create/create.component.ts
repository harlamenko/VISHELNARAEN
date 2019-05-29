import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { WebStorageService } from 'src/app/services/web-storage.service';
import { Variant } from 'src/app/models/Product';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public mainProduct;

  public variantAdded = false;
  public sexesTypes: any;

  public currentVariant = 0;
  public choosedSizeId = 0;
  public allColors: string[] = [];
  public allSizes: string[] = ['XS', 'S', 'M', 'L', 'XL'];
  @ViewChild('canvasForPhoto') canvasForPhoto: ElementRef;

  constructor(
    private _productService: ProductService,
    public webStorageService: WebStorageService,
    public baseService: BaseService
  ) { }

  ngOnInit() {
    this.mainProduct = {
      title: '',
      cat: 'for_men',
      type: 'jackets',
      price: 0,
      rus_name: '',
      rating: 0,
      descr: [],
      variants: []
    };
    this._productService.getSexType().subscribe(sexesTypes => {
      this.sexesTypes = sexesTypes;
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

  isExistedSize(i){
    const sizes = this.mainProduct.variants[this.currentVariant] ? this.mainProduct.variants[this.currentVariant].sizes : [];
    return sizes.indexOf(this.allSizes[i]) !== -1;
  }

  countColors() {
    this.allColors = [];
    this.mainProduct.variants.forEach(variant => {
      this.allColors.push(variant.color);
    })
  }

  back() {
    window.history.back();
  }

  // циклический слайдер
  slidePhoto(side) {
    switch(side){
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
      const newVar = new Variant();
      newVar.photo = base64Img;
      this.mainProduct.variants.push(newVar);
      this.addNewVariant();
    });

    reader.readAsDataURL(file);
  }

  addNewVariant() {
    this.variantAdded = true;
    this.currentVariant = this.mainProduct.variants.length - 1;
    const newVar = this.mainProduct.variants[this.currentVariant];
    newVar.color = 'none';
    newVar.sizes = [];
    this.countColors();
    this.getPipette(newVar.photo);
  }

  delProduct() {
    this.mainProduct.variants.splice(this.currentVariant, 1);
    this.allColors.splice(this.currentVariant, 1);
    this.currentVariant = 0;
  }

  endAddVariant() {
    const vars = this.mainProduct.variants;
    if (vars[vars.length - 1].color === 'none') {
      this.baseService.popup.open('Необходимо выбрать цвет товара!', null, null, true);
    } else {
      this.variantAdded = false;
    }
  }

  toggleSize(size, i) {
    const sizes = this.mainProduct.variants[this.currentVariant].sizes;
    const idx = sizes.indexOf(size);
    if (idx !== -1){
      sizes.splice(idx, 1);
    } else {
      sizes.push(size);
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
      self.mainProduct.variants[self.currentVariant].color = hex;
      self.countColors();
    };
  }

  addNewDescrLine(e) {
    const val = e.target.value;
    if (val.length) {
      this.mainProduct.descr.push(val);
      e.target.value = '';
    }
  }

  blurDescrInput(i, e) {
    const val = e.target.value;
    if (val.length) {
      this.mainProduct.descr[i] = val;
    } else {
      this.mainProduct.descr.splice(i, 1);
    }
  }

  keydownNamePriceCtrls(e) {
    if (e.key !== 'Enter')  { return; }

    const nextLine = e.target.nextElementSibling;
    if (nextLine) {
      nextLine.focus();
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

  handleSelection(e, type) {
    const val = e.target.value;

    switch (type) {
      case 'sex':
        this.mainProduct.cat = val;
        break;
      case 'type':
        this.mainProduct.type = val;
        break;
      }
  }

  validate() {
    const validateMessages = [];
// tslint:disable-next-line: forin
    for (let k in this.mainProduct) {
      switch (k) {
        case 'rus_name':
          if (!this.mainProduct[k].length) {
            validateMessages.push('Поле название не заполнено!');
          }
          break;
        case 'title':
          if (!this.mainProduct[k].length) {
            validateMessages.push('Поле описание не заполнено!');
          }
          break;
        case 'price':
          if (!this.mainProduct[k]) {
            validateMessages.push('Поле цена не заполнено!');
          }
          break;
        case 'descr':
          if (!this.mainProduct[k].length) {
            validateMessages.push('Необходимо добавить описание!');
          }
          break;
        case 'variants':
          this.mainProduct.variants.forEach((variant, i) => {
            if (!variant.sizes.length) {
              validateMessages.push(`Не указаны размеры ${i + 1}-го товара!`);
            }
          });
          break;
      }
    }

    return {
      success: !validateMessages.length,
      messages: validateMessages
    }
  }

  addProduct() {
    if (this.variantAdded) {
      this.baseService.popup.open('Редактирование не окончено!', null, null, true);
      return;
    }

    const validateResult = this.validate();

    if (!validateResult.success) {
      this.baseService.popup.open(validateResult.messages, null, null, true);
      return;
    } else {
      this._productService.addProduct(this.mainProduct).subscribe(
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
    this.mainProduct = {
      title: '',
      cat: 'for_men',
      type: 'jackets',
      price: 0,
      rus_name: '',
      rating: 0,
      descr: [],
      variants: []
    };
  }

}
