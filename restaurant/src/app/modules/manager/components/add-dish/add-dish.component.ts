import { Component, HostListener, Output, ViewChild, EventEmitter, Input } from '@angular/core'
import { NgForm } from '@angular/forms'
import {AddedImage} from "@manager/interfaces/added-image.schema";
import {Dish} from "@dishes/interfaces/dish.interface";
import {ImageEntry} from "@shared/types/image-entry.type";
import {CurrencyService} from "@core/services/currency.service";
import {HttpService} from "@core/services/http.service";
import {ApiPathEnum} from "@shared/enums/api-path.enum";

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html'
})
export class AddDishComponent {
  images: AddedImage[] = []
  @Input() dishId!:string;

  onImagesChange(images: AddedImage[]) {
    this.images = images
  }
}
