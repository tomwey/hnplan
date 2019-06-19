import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the FilterItemsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
interface FilterItem {
  name: string;
  value?: any;
  closable: boolean;
}

@Component({
  selector: 'filter-items',
  templateUrl: 'filter-items.html'
})

export class FilterItemsComponent {

  private _items: Array<FilterItem> = [];

  @Input()
  get items(): Array<FilterItem> {
    return this._items;
  };
  set items(value) {
    this._items = value;
    this.itemsChange.emit(value);
  }
  @Output() itemsChange: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  close(item) {
    if (!item.closable) return;
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.itemsChange.emit(this.items);
    }
  }

}
