import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleService {
  thousand: string ='';
  pointer: number = 0;
  constructor() { }

  public currencyFormatting(value_m2: string):string{
    let valor_m2 = value_m2;
    if(valor_m2.length >= 4 && valor_m2.length < 13 ){
      this.pointer = valor_m2.length
      this.pointer = valor_m2.length == 4?this.pointer -= 1:valor_m2.length == 5?this.pointer -= 2:
      valor_m2.length < 6? this.pointer -= 0:this.pointer -= 3;
      valor_m2 = valor_m2.replace(',', '')
      if(this.pointer == 7){
        this.thousand =  `${valor_m2.substring(0, 4)}.${valor_m2.substring(4, this.pointer)}`;
        return `${this.thousand},${value_m2.substring(this.pointer+1, valor_m2.length+1)}`;
      } else if(this.pointer == 9){
        this.pointer--;
        valor_m2 = valor_m2.replace('.', '');
        this.thousand =  `${valor_m2.substring(0, 5)}.${valor_m2.substring(5, this.pointer)}`;
        return `${this.thousand},${valor_m2.substring(this.pointer, valor_m2.length)}`;
      }
      valor_m2 = `${valor_m2.substring(0, this.pointer)},${valor_m2.substring(this.pointer)}`;
      this.pointer++;  
    }
    return valor_m2;
  }

  public wipeValue_m2(event: KeyboardEvent, value_m2: string): string{
    let valor_m2 = value_m2
    if(event.key == 'Delete'){
      valor_m2 = valor_m2.length == 11?`${valor_m2.replace('.', '').substring(0,4)}.${valor_m2.replace('.', '').substring(4)}`:valor_m2;
      valor_m2 = valor_m2.length == 10?valor_m2.replace('.', ''):valor_m2
      valor_m2 = valor_m2.length == 4?valor_m2.replace(',', ''):valor_m2
    }
    if(event.key == 'Backspace'){
      valor_m2 = valor_m2.length == 11?`${valor_m2.replace('.', '').substring(0,4)}.${valor_m2.replace('.', '').substring(4)}`:valor_m2;
      valor_m2 = valor_m2.length == 10?valor_m2.replace('.', ''):valor_m2
      valor_m2 = valor_m2.length == 4?valor_m2.replace(',', ''):valor_m2
    }
    return valor_m2
  }
}
