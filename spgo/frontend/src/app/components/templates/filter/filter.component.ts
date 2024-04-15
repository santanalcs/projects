import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  filtro: string = '';
  disabled: boolean = true;

  @Input()searchField: string | undefined;

  @Output() lookup = new EventEmitter<string>();
 
  public btnSearch(){
    if(this.filtro == ''){
      this.disabled = true;
      return;
    }
    this.disabled = false;
  }
  
  public search(){
    this.lookup.emit(this.filtro);
    this.filtro = '';
    this.disabled = true;
  }

  clear(){
    this.filtro = '';
    this.disabled = true;
    this.lookup.emit(this.filtro);
  }
}
