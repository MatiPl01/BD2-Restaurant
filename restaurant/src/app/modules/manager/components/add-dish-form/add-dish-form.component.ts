import {Component, HostListener, Output, ViewChild, EventEmitter, Input, SimpleChange, OnChanges} from '@angular/core'
import {AddedImage} from "@manager/interfaces/added-image.schema";
import {NgForm} from "@angular/forms";
import {CurrencyService} from "@core/services/currency.service";
import {HttpService} from "@core/services/http.service";
import {Dish} from "@dishes/interfaces/dish.interface";
import {ApiPathEnum} from "@shared/enums/api-path.enum";
import {ImageEntry} from "@shared/types/image-entry.type";


@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html'
})
export class AddDishFormComponent implements OnChanges {
  @Output() imagesChangedEvent = new EventEmitter<AddedImage[]>()
  @ViewChild('f') mainForm!: NgForm;
  @ViewChild('g') imageForm!: NgForm;
  @Input() images: AddedImage[] = []
  @Input() dishId!: string;
  isImageValid: boolean = true
  isWidthValid: boolean = true
  isGroupValid: boolean = true

  constructor(public currencyService: CurrencyService, private httpService: HttpService) {
  }

  @HostListener('reset')
  onReset() {
    this.imageForm.resetForm()
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let change: SimpleChange = changes['dishId']
    if (change && change.currentValue != '') {
      this.httpService.get<Dish>(ApiPathEnum.DISHES + '/' + change.currentValue + '?currency=' + this.currencyService.currency?.code).subscribe(dish => {
        this.images=[]
        for(let i=0;i<dish.images[0].breakpoints.length;i++){
          this.images.push({path:dish.images[0].paths[i],width:dish.images[0].breakpoints[i],group:i})
        }
        this.imagesChangedEvent.emit(this.images)
        this.mainForm.setValue({
            name : dish.name,
            cuisine : dish.cuisine,
            type : dish.type,
            category : dish.category,
            ingredients : dish.ingredients.join(','),
            stock : dish.stock,
            price : dish.unitPrice,
            description : dish.description,
          })
        }
      )
      this.dishId=''
    }
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
      console.log(dish)
      this.httpService.post<Dish>(ApiPathEnum.DISHES, dish).subscribe()
      window.location.reload();
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
      this.images.push({path, width, group})
      this.imageForm.resetForm()
      this.images.sort((a: AddedImage, b: AddedImage) => {
        return 10 * Math.sign(a.group - b.group) + Math.sign(a.width - b.width)
      })
      this.imagesChangedEvent.emit(this.images)
    }
  }

  private createDishObject(form: NgForm): Dish {
    return {
      name: form.value.name,
      cuisine: form.value?.cuisine?.toLowerCase() || 'międzynarodowa',
      type: form.value?.type?.toLowerCase() || 'pozostałe',
      category: form.value?.category || 'pozostałe',
      ingredients: this.convertStringToArray(form.value.ingredients),
      stock: form.value.stock,
      // @ts-ignore
      currency: this.currencyService.currency?.code,
      unitPrice: form.value.price,
      description: this.convertStringToArray(form.value.description),
      coverIdx: 0,
      images: this.getImagesData(),
    }
  }

  private convertStringToArray(s:string):string[]{
    let array:string[]=[]
    let temp=""
    for(let i=0;i<s.length;i++){
      if(s[i]!=',')temp+=s[i]
      else{
        array.push(temp)
        temp=""
      }
    }
    array.push(temp)
    return array
  }

  private getImagesData(): ImageEntry[] {
    if (!this.images.length) return []
    let currEntry = {breakpoints: [this.images[0].width], paths: [this.images[0].path]}
    if (this.images.length === 1) return [currEntry]
    const emptyEntry = {breakpoints: [], paths: []}
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

  getSymbol() {
    if (this.currencyService.currency?.symbol !== null) return this.currencyService.currency?.symbol
    return 'PLN'
  }
}
