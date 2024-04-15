import { Component } from '@angular/core';

import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../views/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(private authGuardService: AuthGuardService) {}

  ngOnInit(): void {}

  public get name(): string {
    if(this.authGuardService.guard.name){
      return this.authGuardService.guard.name;
    } else {
      return "...?";
    } 
  }
}
