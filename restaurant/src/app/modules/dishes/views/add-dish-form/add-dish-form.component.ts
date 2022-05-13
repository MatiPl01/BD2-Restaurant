import { Component, HostListener, Output, ViewChild, EventEmitter, Input } from '@angular/core'
import { NgForm } from '@angular/forms'
import {CurrencyService} from "@shared/services/currency.service";
import {AddedImage} from "@shared/interfaces/added-image.interface";
import {DishesService} from "@dishes/services/dishes.service";
import {DishData} from "@dishes/interfaces/dish.interface";
import {ImageEntry} from "@shared/interfaces/image-entry.interface";

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styles: [
  ]
})
export class AddDishFormComponent{
  @Output() imagesChangedEvent = new EventEmitter<AddedImage[]>()
  @ViewChild('f') mainForm!: NgForm;
  @ViewChild('g') imageForm!: NgForm;
  @Input() images: AddedImage[] = []
  isImageValid: boolean = true
  isWidthValid: boolean = true
  isGroupValid: boolean = true

  constructor(public currencyService: CurrencyService, private dishesService: DishesService) {}

  @HostListener('reset')
  onReset() {
    this.imageForm.resetForm()
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.images.length) {
      // Create a dish data object
      const dish = this.createDishObject(form)
      // Clear form
      this.images = []
      this.imagesChangedEvent.emit(this.images)
      form.reset()
      // Send data to the service
      this.dishesService.createDish(dish).subscribe()
    }
  }

  onImageAdd(form: NgForm): void {
    const path = form.value.image?.trim()
    const width = +form.value.width
    const group = +form.value.group
    this.isImageValid = path !== ''
    // @ts-ignore
    this.isWidthValid = width >= 20 && width <= 4000
    this.isGroupValid = form.value.group.length > 0 && (group >= 0 && group <= 99)

    if (this.isImageValid && this.isWidthValid && this.isGroupValid) {
      this.images.push({ path, width, group })
      this.imageForm.resetForm()
      this.images.sort((a: AddedImage, b: AddedImage) => {
        return 10 * Math.sign(a.group - b.group) + Math.sign(a.width - b.width)
      })
      this.imagesChangedEvent.emit(this.images)
    }
  }

  private createDishObject(form: NgForm): DishData {
    return {
      name: form.value.name,
      category: form.value?.category || 'pozostałe',
      cuisine: form.value?.cuisine?.toLowerCase() || 'międzynarodowa',
      type: form.value?.type?.toLowerCase() || 'pozostałe',
      ingredients: form.value.ingredients?.trim().split(',').map((s: string) => s.trim()) || [],
      stock: form.value.stock,
      // @ts-ignore
      currency: this.currencyService.currency,
      unitPrice: +form.value.price.replace(',', '.'),
      ratingsAverage: 0,
      ratingsCount: 0,
      description: form.value.description.split('\n').map((p: string) => p.trim()),
      images: {
        coverIdx: 0,
        gallery: this.getImagesData()
      },
      //TO DO
      mainUnitPrice: 10
    }
  }

  private getImagesData(): ImageEntry[] {
    if (!this.images.length) return []
    let currEntry = { breakpoints: [this.images[0].width], paths: [this.images[0].path] }
    if (this.images.length === 1) return [currEntry]
    const emptyEntry = { breakpoints: [], paths: [] }
    const entries: ImageEntry[] = []

    for (let i = 1; i < this.images.length; i++) {
      const currImage = this.images[i]
      if (currImage.group !== this.images[i - 1].group) {
        entries.push(currEntry)
        currEntry = JSON.parse(JSON.stringify(emptyEntry))
      }
      currEntry.breakpoints.push(currImage.width)
      currEntry.paths.push(currImage.path)
    }
    entries.push(currEntry)

    return entries
  }
}
