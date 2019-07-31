import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {
  @Input() photo: WindowBase64;
  @Output() colorChoosed: EventEmitter<string> = new EventEmitter;
  @ViewChild('canvasForPhoto') canvasForPhoto: ElementRef;

  constructor() { }

  ngOnInit() {
    const canvas = this.canvasForPhoto.nativeElement;
    canvas.width = canvas.offsetParent.offsetWidth;
    canvas.height = canvas.offsetParent.offsetHeight;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = this.photo.toString();
    image.onload = function() {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    fromEvent(canvas, 'click').subscribe(event => {
      const imageData = this.getImageData(ctx, event),
      hex = '#' + ('000000' + this.rgbToHex(imageData[0], imageData[1], imageData[2])).slice(-6);

      this.colorChoosed.emit(hex);
    });
  }
  getImageData(ctx, e) {
    let obj = ctx.canvas;
    let current_left = 0, current_top = 0;
    if (obj.offsetParent) {
        do {
            current_left += obj.offsetLeft;
            current_top += obj.offsetTop;
        } while (obj = obj.offsetParent);

        const x = e.pageX - current_left,
        y = e.pageY - current_top;

        return ctx.getImageData(x, y, 1, 1).data;
    }
    return undefined;
  }

  rgbToHex(r: number, g: number, b: number): string {
    if (r > 255 || g > 255 || b > 255) {
        throw "Invalid color components";
    }
    return ((r << 16) | (g << 8) | b).toString(16);
  }
}
