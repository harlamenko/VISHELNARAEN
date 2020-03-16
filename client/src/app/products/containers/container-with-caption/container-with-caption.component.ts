import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WebStorageService } from 'src/app/main/web-storage.service';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-container-with-caption',
  templateUrl: './container-with-caption.component.html',
  styleUrls: ['./container-with-caption.component.scss']
})
export class ContainerWithCaptionComponent implements OnInit {
  @Input() group: FormGroup;
  @Output() newPhotoSelected: EventEmitter<string> = new EventEmitter();
  @Output() delete: EventEmitter<void> = new EventEmitter();

  maxPrice = 999999999;

  constructor(public webStorageService: WebStorageService) { }
  ngOnInit() {}

  selectPhoto(e) {
    if (!e.isTrusted) { return; }

    const file: File = e.target.files[0];
    const reader = new FileReader();

    fromEvent(reader, 'load').pipe(
      map((e: any) => e.target.result),
    ).subscribe(base64 => this.newPhotoSelected.emit(base64));

    reader.readAsDataURL(file);
  }

  deleteCurrentVariant() {
    this.delete.emit();
  }

  priceChanged(price) {
    if (price > this.maxPrice) {
      this.group.patchValue({price: this.maxPrice});
    }
  }
}
