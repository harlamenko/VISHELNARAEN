import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  @ViewChild('canvasForPhoto') canvasForPhoto: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  addPhotoVariant(e) {
    if (!e.isTrusted) { return; }

    const file: File = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      const base64Img = event.target.result;

      //TODO(Harlamenko): changed to emitter which subscription addNewVariant
      // this.addNewVariant(base64Img);
    });

    reader.readAsDataURL(file);
  }

  // getPipette(src) {
  //   const canvas = this.canvasForPhoto.nativeElement;
  //   canvas.width = canvas.offsetParent.offsetWidth;
  //   canvas.height = canvas.offsetParent.offsetHeight;
  //   const ctx = canvas.getContext('2d');

  //   const image = new Image();
  //   image.src = src;
  //   image.onload = function() {
  //     ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  //   }

  //   const self = this;
  //   canvas.onclick = function(e) {
  //     const position = self.findPos(this);
  //     const x = e.pageX - position.x;
  //     const y = e.pageY - position.y;
  //     const p = ctx.getImageData(x, y, 1, 1).data;
  //     const hex = '#' + ('000000' + self.rgbToHex(p[0], p[1], p[2])).slice(-6);
  //     const variants = (self.mainProductFG.get('variants') as any).controls;
  //     variants[variants.length - 1].patchValue({'color': hex});
  //     self.getAllVariantsColors();
  //   };
  // }

  // endAddVariant() {
  //   const vars = this.mainProductFG.get('variants');
  //   if (isNull(vars.value[this.currentVariant].color)) {
  //     this.baseService.popup.open('Необходимо выбрать цвет товара!', null, null, true);
  //   } else {
  //     this.variantAdded = false;
  //   }
  // }

  // addNewVariant(photo: string) {
  //   this.variantAdded = true;
  //   this.getPipette(photo);
  //   const variants: FormArray = this.mainProductFG.get('variants') as FormArray;
  //   const varFG: FormGroup = ProductFormGroupModel.makeVariantFG(photo, null, this.allSizes);

  //   variants.push(varFG);
  //   this.currentVariant = variants.length - 1;
  //   this.getAllVariantsColors();
  // }

    // циклический слайдер
    // slidePhoto(side) {
    //   switch (side) {
    //     case 'right':
    //       this.currentVariant = (this.currentVariant + 1) % this.allColors.length;
    //       break;
    //     case 'left':
    //       // чтобы не уходить в индекс меньший нуля присваиваем idx индекс последнего эл, если текущий idx = 0
    //       this.currentVariant = this.currentVariant === 0 ? this.allColors.length - 1 : ((this.currentVariant - 1) % this.allColors.length);
    //       break;
    //   }
    // }

    // delProduct() {
    //   const vars = this.mainProductFG.get('variants') as FormArray;
    //   vars.removeAt(this.currentVariant);
    //   this.allColors.splice(this.currentVariant, 1);
    //   this.currentVariant = 0;
    // }

    // rgbToHex(r, g, b){
    //   if (r > 255 || g > 255 || b > 255) {
    //       throw "Invalid color component";
    //   }
    //   return ((r << 16) | (g << 8) | b).toString(16);
    // }
}
