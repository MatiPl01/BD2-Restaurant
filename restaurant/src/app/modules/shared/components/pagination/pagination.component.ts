import { Component, Input, Output, EventEmitter } from '@angular/core';
import {PaginationData} from "@shared/interfaces/pagination.interface";

@Component({
  selector: 'shared-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent{
  @Input() pagesCount: number=1;
  @Input() maxDisplayedNumbersCount: number = 10
  @Output() pageChangeEvent = new EventEmitter<PaginationData>();

  currentPage: number = 1
  selectedMaxNumber:number=10

  pagesNumbers: number[] = []


  private updateMiddlePagesNumbers() {
    let arr = []
    const range=2
    if (this.pagesCount < 3) this.pagesNumbers = []
    let startNum = this.currentPage - range
    let endNum = this.currentPage + range

    if (startNum < 2) {
      arr=Array(range+2).fill(1).map((x,i)=>i+2)
      this.pagesNumbers = arr
      return arr
    }
    else if (endNum >= this.pagesCount) {
      arr=Array(range+2).fill(1).map((x,i)=>i+this.pagesCount-range)
      this.pagesNumbers = arr
      return arr
    }

    for (let i = startNum; i <= endNum; i++) arr.push(i)
    this.pagesNumbers = arr
    return arr
  }

  public changeCurrentPage(pageNum:number):void{
    if (pageNum === this.currentPage) return;
    this.currentPage = pageNum;
    this.pageChangeEvent.emit({page:this.currentPage,limit:this.selectedMaxNumber});
    this.updateMiddlePagesNumbers()
  }

  public changeItemPerPage():void{
    this.currentPage=1
    this.pageChangeEvent.emit({page:this.currentPage,limit:this.selectedMaxNumber});
    this.updateMiddlePagesNumbers()
  }

  public getArrayOfNumbers(value:number){
    return Array(value).fill(1).map((x,i)=>i+1)
  }
}
