import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DishCardsService} from "@dishes/services/dish-cards.service";
import {Subject} from "rxjs";

@Component({
  selector: 'manager-view',
  templateUrl: './manager-view.component.html',
  providers: [DishCardsService]
})
export class ManagerViewComponent implements OnInit {
  @Output() editDish = new EventEmitter<string>();
  id=''
  constructor() { }

  ngOnInit(): void {
  }

  onEditDish(event:string){
    this.id=event
  }

}
