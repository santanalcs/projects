import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from 'src/app/components/templates/card.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-feedstock',
  templateUrl: './feedstock.component.html',
  styleUrls: ['./feedstock.component.css']
})
export class FeedstockComponent {

  public rating: string = "";

  constructor(private cardService: CardService, private authGuardService: AuthGuardService, private router: Router, private authService: AuthService) {
    cardService.subtitle = {
      text: "Cadastrar Insumo",
      icon: "inventory_2"
    }
  }

  ngOnInit():void{
    this.authService.auth().subscribe(res => {
      if(res == null){
        this.router.navigate(['/login']);
        return;
      }
      //this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
    })
  }

  public onChangeRating(value: any) {
    this.rating = value.target.value;
    //console.log(this.rating);
  }
}
