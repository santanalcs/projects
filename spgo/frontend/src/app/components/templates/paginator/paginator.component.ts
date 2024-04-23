import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  pageSize: number = 0;
  @Input()currentPage: number | undefined;
  @Input()totalSize: number | undefined;
  @Input()sizeOptions: any;

  
  constructor() {}

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator | undefined;
  @Output() cPage = new EventEmitter<any>();
  @Output() pSize = new EventEmitter<any>();

  ngOnInit(): void {
    this.tranlationPagination();
  }

  private tranlationPagination(){
    this.paginator!._intl.itemsPerPageLabel = 'Itens por página:';
    this.paginator!._intl.nextPageLabel = 'Próxima';
    this.paginator!._intl.previousPageLabel = 'Anterior';
    this.paginator!._intl.firstPageLabel = 'Primeira página';
    this.paginator!._intl.lastPageLabel = 'Última página.';
    this.paginator!._intl.getRangeLabel = this.traslationRangelLabel;
  }

  private traslationRangelLabel(page:number, pageSize:number, length:number){
    const startIndex = page * pageSize;
    const endIndex = (startIndex > length)? 
                      Math.min(startIndex + pageSize):
                      startIndex + pageSize;
    return `Itens: ${startIndex + 1} - ${endIndex > length? length:endIndex} | Página: ${page +1}
                   de ${Math.ceil(length / pageSize)} | Total: ${length} itens`;
  }

  public handlePage(e:any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.cPage.emit(this.currentPage);
    this.pSize.emit(this.pageSize);
  }
}
