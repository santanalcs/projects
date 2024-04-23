import { Injectable } from '@angular/core';
import { DataFilter } from 'src/app/models/datafilter.model';
import { Measure } from 'src/app/models/measures-unit.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  public filterName(data: any, event: string) {
    return data.filter((data: DataFilter) => data.name.toLowerCase().indexOf(event.toLowerCase()) > -1);
  }

  public filterDescription(data: any, event: string) {
    return data.filter((data: DataFilter) => data.description.toLowerCase().indexOf(event.toLowerCase()) > -1);
  }
}
