import { InvokeFunctionExpr } from '@angular/compiler';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Optional,
} from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']})

export class ListItemsComponent implements OnInit {
  @Output() change = new EventEmitter();
  @Input('list') list: any[] = [];
  @Input('fieldName') fieldName?: string;
  @Input('fieldType') fieldType?: string;
  textBoxValue: string = '';
  toggle: boolean = true;
  patternType = this.fieldName === 'Email' ? '' : '';

  constructor() {}

  ngOnInit(): void {
    this.patternType =
      this.fieldName === 'Phone'
        ? '91+[+]+[0-9]{10}$'
        : '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.com$';
  }

  changeToggle() {
    this.toggle = !this.toggle;
    return this.toggle;
  }

  handleAdd() {
    if (this.fieldName === 'Email') {
      this.change.emit({
        value: this.textBoxValue,
        type: 'Email',
        action: 'add',
      });
    } else if (this.fieldName === 'Phone') {
      let phoneNumber = parseInt(this.textBoxValue.substring(3, 13));
      this.change.emit({ value: phoneNumber, type: 'Phone', action: 'add' });
    }
  }

  handleRemove(itemValue: string | number) {
    if (this.fieldName === 'Email') {
      this.change.emit({ value: itemValue, type: 'Email', action: 'remove' });
    } else if (this.fieldName === 'Phone') {
      this.change.emit({ value: itemValue, type: 'Phone', action: 'remove' });
    }
  }
  
}
