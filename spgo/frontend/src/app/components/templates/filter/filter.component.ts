import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../views/user/auth.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  filtro: string = '';
  inputSize: number = 0;
  disabled: boolean = true;
  
  @Input()searchField: string | undefined;
  @Input()addHidden: boolean | undefined;

  @Output() lookup = new EventEmitter<string>();
  @Output() origin = new EventEmitter();
  @Output() level = new EventEmitter<number>();

  public inputSearch(){
    if(this.inputSize == this.filtro.length){
      return;
    }
    if(this.filtro.length == 0){
      this.lookup.emit(this.filtro);
      this.inputSize = 0;
      return;
    }
    this.lookup.emit(this.filtro);
    this.inputSize++;
    if(this.inputSize > this.filtro.length){
      while(this.inputSize > this.filtro.length){
        this.inputSize --;
      }
      if(this.inputSize == this.filtro.length){
        this.inputSize++;
      }
    }
  }
  
  public btnAdd(){
    this.origin.emit();
  }

  public comeBack (): void{
    history.back();
  }

  clear(){
    this.filtro = '';
    this.inputSearch();
  }
}
