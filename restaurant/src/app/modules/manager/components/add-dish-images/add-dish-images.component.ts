import { Component, Input, Output, EventEmitter } from '@angular/core';
import {AddedImage} from "@manager/interfaces/added-image.schema";

@Component({
  selector: 'app-add-dish-images',
  templateUrl: './add-dish-images.component.html'
})
export class AddDishImagesComponent {
  @Output() imagesChangedEvent = new EventEmitter<AddedImage[]>()
  @Input() images: AddedImage[] = []
  @Input() dishId!:string;

  onRemoveClick(idx: number): void {
    this.images.splice(idx, 1)
    this.imagesChangedEvent.emit(this.images)
  }
}
