import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the CustomMonthPickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-month-picker',
  templateUrl: 'custom-month-picker.html'
})
export class CustomMonthPickerComponent {

  months: any = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ];

  currMonth: number = 0;
  currYear: number;
  openPicker: boolean = false;

  private _date: Date;
  @Output() dateChange: EventEmitter<Date> = new EventEmitter();
  @Input()
  get date(): Date {
    let date = this._date || new Date();
    return date;
  }
  set date(d: Date) {
    this._date = d;
    this.currMonth = d.getMonth() + 1;
    this.currYear = d.getFullYear();
    this.dateChange.emit(d);
  }

  constructor() {
    this.currMonth = (this.date.getMonth() + 1);
    this.currYear = this.date.getFullYear();
  }

  selectMonth(month) {
    // this.currMonth = month;
    this.openPicker = false;
    // this.updateDate();
    let d = this.date || new Date();
    d.setMonth(month - 1);
    this.date = d;
  }

  togglePicker() {
    this.openPicker = !this.openPicker;
  }

  prev() {

    if (this.openPicker) {
      // let month = this.currMonth;
      let d = this.date || new Date();
      // d.setMonth(month + 1);
      d.setFullYear(d.getFullYear() - 1);
      this.date = d;
    } else {
      let d = this.date || new Date();
      d.setMonth(d.getMonth() - 1);
      this.date = d;
    }
  }

  next() {
    if (this.openPicker) {
      // let month = this.currMonth;
      let d = this.date || new Date();
      // d.setMonth(month + 1);
      d.setFullYear(d.getFullYear() + 1);
      this.date = d;
    } else {
      let d = this.date || new Date();
      d.setMonth(d.getMonth() + 1);
      this.date = d;
    }
  }

}
