import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
import { CardService } from '../../templates/card.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(private cardService: CardService, private authGuardService: AuthGuardService, private router: Router, private authService: AuthService) {
    cardService.subtitle = {
      text: 'Home',
      icon: 'home',
    }
    authGuardService.guard.name;
  }

  ngOnInit():void{
    this.authService.auth().subscribe(res => {
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
    })
  } 
}
