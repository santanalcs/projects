import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from 'src/app/components/templates/card.service';
import { Construction } from 'src/app/models/construction.model';
import { AuthService } from '../user/auth.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { ConstructionService } from './construction.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { ConfirmComponent } from '../../shared/dialog/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { concat } from 'rxjs';
import { HandleService } from '../handle.service';
import { DialogAddAddressComponent } from '../../shared/dialog/dialog-add-address/dialog-add-address.component';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.css']
})
export class ConstructionComponent {
  msg: string = "";
  isError: boolean = false;

  disabled: boolean = true;

  construction: Construction = {
    pattern_type: '',
    owner:  '',
    owner_cpf: '',
    liable_engineer: '',
    engineer_registration: '',
  }

  mask: string = '';
  maxlength_input_cpf_cnpj: string = '';

  valueStr: string = '';
  pointer: number = 0;
  thousand: string ='';
  virgula: string = ',';
  ponto: string = '.';

  
  text: string = '';
  maxlength_input_value_m2: string = '';
  maskC: string = '';
  masck1 = ',##,'

  hidden: string = 'true';

  patterns_types: any = [
    {acronym: 'R1-A', description: 'Residência unifamiliar padrão alto'},
    {acronym: 'R1-N', description: 'Residência unifamiliar padrão normal'},
    {acronym: 'R1-B', description: 'Residência unifamiliar padrão baixo'},
    {acronym: 'RP1Q', description: 'Residência unifamiliar popular'},
    {acronym: 'PIS', description: 'Residência multifamiliar - Projeto de interesse social'}
  ]

  @ViewChild('formConstruction') formConstruction!: NgForm;
  @ViewChild('pattern_typeSelect') patternType!: ElementRef;

  constructor(private cardService: CardService, private authGuardService: AuthGuardService, private router: Router, 
    private authService: AuthService, private constructionService: ConstructionService, private handleService: HandleService,
    private snackBar:SnackBarService, private dialog: MatDialog){

    cardService.subtitle = {
      text: 'Cadastrar Obra',
      icon: 'roofing',
    }
  }

  ngOnInit():void{
    this.authService.auth().subscribe(res => {
      if(res == null){
        this.router.navigate(['/login']);  
      }
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
      //this.authGuardService.guard.allowable_level = res.user.allowable_level;
    })
    /*if(this.contractorService.origin.pageOrigin){
      this.contractorService.origin.pageOrigin = false;
      this.disabled = false;
    }*/
  }

  public maskCpfCnpj():void{ 
    this.mask = '###.###.###-##';
    this.maxlength_input_cpf_cnpj = '14';
    let i = this.construction.owner_cpf.length;
    let output = '#';
    let text = this.mask.substring(i);
    while(text.substring(0, 1) != output && text.length){
      this.construction.owner_cpf += text.substring(0, 1);
      i++;
      text = this.mask.substring(i);  
    }
  }

  public onChangePatternType(event: any) {
    this.construction.pattern_type = event.target.value;
    //this.contractor.cpf_cnpj!=null?this.contractor.cpf_cnpj='':null;
  }

  /*public maskCurrency():void{
    this.maxlength_input_value_m2 = '12'
    this.mask = 'R$ ';
    let i = this.construction.value_m2.length;
    let output = '#';
    let text = this.mask.substring(i);
    while(text.substring(0, 1) != output && text.length){
      this.construction.value_m2 += text.substring(0, 1);
      i++;
      text = this.mask.substring(i); 
    }
  }*/
  
  /*public currencyFormatting(){
    this.construction.value_m2 = this.handleService.currencyFormatting(this.construction.value_m2); 
  }*/

  /*public wipeValue_m2($event: KeyboardEvent){
    if($event.key == 'Delete' && this.construction.value_m2.length == 12){
        return;
    }
    if($event.key == 'Backspace' || $event.key == 'Delete'){
      this.construction.value_m2 = this.handleService.wipeValue_m2($event, this.construction.value_m2);
      if(this.construction.value_m2.length < 3){
        this.maskCurrency();
      }
    }
  }*/

  /*public unfocusValue_m2(){
    if(!this.construction.value_m2.substring(3)){
      this.construction.value_m2 = '';
    }
  }*/

  public confirm(): void{
    this.constructionService.createConstruction(this.construction, this.authGuardService.guard.token).subscribe(res => {
      if(res.error){
        res.error.pattern_type?this.msg = res.error.pattern_type.msg:
        res.error.liable_engineer?this.msg = res.error.liable_engineer.msg:
        res.error.engineer_registration?this.msg = res.error.engineer_registration.msg:
        res.error.owner?this.msg = res.error.owner.msg:
        res.error.owner_cpf?this.msg = res.error.owner_cpf.msg:
        this.msg = res.error.msg;
        this.isError = true;
      }else if (res.success){
        console.log(this.construction)
        this.msg = res.success.msg;
        this.constructionService.indexConstruction(this.construction.owner_cpf).subscribe(res => {
          //this.construction.id = res.construction.id;
          this.construction.owner_cpf = res.construction.id;
        })
        const dialogRef = this.dialog.open(ConfirmComponent,{
          data: {msg:`Incluir endereço para: ${this.construction.owner_cpf}`, hidden: true, btn: 'Ok'},
        }) 
        dialogRef.afterClosed().subscribe( (res: boolean) => {
          //console.log(res)
          const dialogRef = this.dialog.open(DialogAddAddressComponent,{
            data: {
              entity: "Proprietario",
              id: this.construction.owner_cpf,
              name: this.construction.owner_cpf.toUpperCase(),
              address: "",
              district: "",
              zip_code: "",
              city: "",
              uf: "",
            },
          })
          dialogRef.afterClosed().subscribe( (res: boolean) => {
            this.construction.pattern_type = this.patternType.nativeElement.value = "";
            this.formConstruction.resetForm();
          })
        })
      }
      this.snackBar.showMessage(this.msg, this.isError);
      this.isError = false;
    })
  }
}
