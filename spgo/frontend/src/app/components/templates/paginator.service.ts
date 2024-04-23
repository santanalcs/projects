import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataPaginator } from 'src/app/models/datapaginator.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class PaginatorService {

  private _paginator = new BehaviorSubject<DataPaginator>({
    pageSize: 0,
  })

  constructor() { }

  public get paginator():DataPaginator {
    return this._paginator.value;
  }

  public set paginator(value:DataPaginator) {
    this._paginator.next(value);
  }

  public iterator(event: any, data: any) {
    //this.currentPage = event;
    const end = (event + 1) * this.paginator.pageSize;
    const start = event * this.paginator.pageSize;
    const dataPage = data.slice(start, end);
    return dataPage;
    //this.dataSource = dataPage;
  }
}
