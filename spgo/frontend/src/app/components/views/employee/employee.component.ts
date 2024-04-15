import { Component } from '@angular/core';
import { CardService } from '../../templates/card.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  constructor(private cardService: CardService, private authGuardService: AuthGuardService, private router: Router, private authService: AuthService) {
    cardService.subtitle = {
      text: 'Cadastro do Colaborador',
      icon: 'engineering',
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
}
