import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core'
import {Options} from '@angular-slider/ngx-slider'
import {DishFilterData} from "@dishes/interfaces/dish-filter.interface";
import {DishService} from "@dishes/services/dish.service";

type dropdownEventObj = { filterAttr: string, value: string }

@Component({
  selector: 'dishes-dishes-filters',
  templateUrl: './dishes-filters.component.html'
})
export class DishesFiltersComponent  implements OnInit, OnDestroy {
  @Output() filterReloadEvent = new EventEmitter<DishFilterData>()

  categoryFilterAttr: string = 'category'
  cuisineFilterAttr: string = 'cuisine'
  typeFilterAttr: string = 'type'
  priceFilterAttr: string = 'unitPrice'
  ratingFilterAttr: string = 'rating'
  categoriesList: string[] = []
  cuisinesList: string[] = []
  typesList: string[] = []

  minPrice=0
  maxPrice=1000
  minRating=0
  maxRating=5

  settings = {
    idField: 'filterID',
    textField: 'filterValue',
    allowSearchFilter: true,
    singleSelection: false,
    enableCheckAll: true,
    itemsShowLimit: 5,
    selectAllText: 'Zaznacz wszystkie',
    unSelectAllText: 'Odznacz wszystkie',
  }

  // Current filters values
  priceValues = {
    min: this.minPrice,
    max: this.maxPrice
  }

  ratingValues = {
    min: this.minPrice,
    max: this.maxPrice
  }

  priceOptions: Options = {
    floor: this.minPrice,
    ceil: this.maxPrice,
  }
  ratingOptions: Options = {
    floor: this.minRating,
    ceil: this.maxRating,
  }

  selectedCategories:string[] = []
  selectedTypes:string[] = []
  selectedCuisines:string[] = []

  constructor(public dishService: DishService) {}

  ngOnInit(): void {
    this.dishService.updateFilters()
    this.dishService.forceReload()
    this.dishService.dishes.subscribe(dishes =>{
      const priceList=dishes.map(item=>item.unitPrice)as number[]
      priceList.sort((n1,n2) => n1 - n2)
      this.minPrice=Math.floor(priceList[0])
      this.maxPrice=Math.ceil(priceList[priceList.length - 1])

      const ratingList=dishes.map(item=>item.ratingsAverage)as number[]
      ratingList.sort((n1,n2) => n1 - n2)
      this.minRating=Math.floor(ratingList[0])
      this.maxRating=Math.ceil(ratingList[ratingList.length - 1])

      this.resetRange()
      this.setRange()

      this.categoriesList=dishes.map(item=>item.category) as string[]
      this.categoriesList=this.categoriesList.filter((value, index) => this.categoriesList.indexOf(value) === index);

      this.cuisinesList=dishes.map(item=>item.cuisine) as string[]
      this.cuisinesList=this.cuisinesList.filter((value, index) => this.cuisinesList.indexOf(value) === index);

      this.typesList=dishes.map(item=>item.type) as string[]
      this.typesList=this.typesList.filter((value, index) => this.typesList.indexOf(value) === index);

    })

  }

  ngOnDestroy(): void {
  }

  private createEventObj(): DishFilterData {
    const selectedFilters:DishFilterData={} as DishFilterData
    if(this.selectedCategories.length>0)selectedFilters.category=this.selectedCategories
    if(this.selectedCuisines.length>0)selectedFilters.cuisine=this.selectedCuisines
    if(this.selectedTypes.length>0)selectedFilters.type=this.selectedTypes
    if(this.priceValues.min!==this.minPrice)selectedFilters["unitPrice[gte]"]=this.priceValues.min
    if(this.priceValues.max!==this.maxPrice)selectedFilters["unitPrice[lt]"]=this.priceValues.max
    if(this.ratingValues.min!==this.minRating)selectedFilters["ratingsAverage[gte]"]=this.ratingValues.min
    if(this.ratingValues.max!==this.maxRating)selectedFilters["ratingsAverage[lt]"]=this.ratingValues.max

    return selectedFilters
  }

  emitFilterReload() {
    this.filterReloadEvent.emit(this.createEventObj())
  }

  onItemSelected(eventObj: dropdownEventObj): void {
    if(eventObj.filterAttr=='category'){
      this.selectedCategories.push(eventObj.value)
    }
    else if(eventObj.filterAttr=='cuisine'){
      this.selectedCuisines.push(eventObj.value)
    }
    else if(eventObj.filterAttr=='type'){
      this.selectedTypes.push(eventObj.value)
    }
    this.emitFilterReload()
  }

  onItemDeSelected(eventObj: dropdownEventObj): void {
    if(eventObj.filterAttr=='category'){
      this.selectedCategories=this.selectedCategories.filter(item=>item!=eventObj.value)
    }
    else if(eventObj.filterAttr=='cuisine'){
      this.selectedCuisines=this.selectedCuisines.filter(item=>item!=eventObj.value)
    }
    else if(eventObj.filterAttr=='type'){
      this.selectedTypes=this.selectedTypes.filter(item=>item!=eventObj.value)
    }
    this.emitFilterReload()
  }

  onSelectedAll(eventObj: dropdownEventObj): void {
    if(eventObj.filterAttr=='category'){
      this.selectedCategories=this.categoriesList
    }
    else if(eventObj.filterAttr=='cuisine'){
      this.selectedCuisines=this.cuisinesList
    }
    else if(eventObj.filterAttr=='type'){
      this.selectedTypes=this.typesList
    }
    this.emitFilterReload()
  }

  onDeSelectedAll(eventObj: dropdownEventObj): void {
    if(eventObj.filterAttr=='category'){
      this.selectedCategories=[]
    }
    else if(eventObj.filterAttr=='cuisine'){
      this.selectedCuisines=[]
    }
    else if(eventObj.filterAttr=='type'){
      this.selectedTypes=[]
    }
    this.emitFilterReload()
  }

  onRangeChanged(eventObj: { filterAttr: string, min: number, max: number }): void {
    if(eventObj.filterAttr=='unitPrice'){
      this.priceValues.min=eventObj.min
      this.priceValues.max=eventObj.max
    }
    else if(eventObj.filterAttr=='rating'){
      this.ratingValues.min=eventObj.min
      this.ratingValues.max=eventObj.max
    }
    this.emitFilterReload()
  }
  resetSelect():void{
    this.selectedTypes=[]
    this.selectedCuisines=[]
    this.selectedCategories=[]
  }
  resetRange():void{
    this.priceValues = {
      min: this.minPrice,
      max: this.maxPrice
    }
    this.ratingValues = {
      min: this.minRating,
      max: this.maxRating
    }
  }
  setRange():void{
    this.priceOptions= {
      floor: this.minPrice,
      ceil: this.maxPrice
    }
    this.ratingOptions= {
      floor: this.minRating,
      ceil: this.maxRating
    }
  }

  onFiltersReset(): void {
    this.resetSelect()
    this.resetRange()
    this.emitFilterReload()
  }
}
