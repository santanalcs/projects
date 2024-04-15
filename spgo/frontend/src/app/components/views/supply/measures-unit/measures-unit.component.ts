import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from 'src/app/components/templates/card.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-measures-unit',
  templateUrl: './measures-unit.component.html',
  styleUrls: ['./measures-unit.component.css']
})
export class MeasuresUnitComponent {

  constructor(private cardService: CardService, private authGuardService: AuthGuardService, private router: Router, private authService: AuthService) {
    cardService.subtitle = {
      text: 'Unidades e Medidas',
      icon: 'straighten'
    }
  }

  ngOnInit():void{
    this.authService.auth().subscribe(res => {
      if(res == null){
        this.router.navigate(['/login']);
        return
      }
      //this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
    })
  }
}
