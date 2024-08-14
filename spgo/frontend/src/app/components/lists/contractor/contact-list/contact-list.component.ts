import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contractor.model';
import { ContractorService } from '../../../views/contractor/contractor.service';
import { CardService } from '../../../templates/card.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../views/user/auth.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterService } from '../../../templates/filter.service';
import { PaginatorService } from '../../../templates/paginator.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { EMPTY, timeInterval, timeout } from 'rxjs';
import { ContactDialogAddComponent } from 'src/app/components/views/contractor/contact/contact-dialog-add/contact-dialog-add.component';
import { ConfirmComponent } from 'src/app/components/shared/dialog/confirm/confirm.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  displayedColumns = ['contractor', 'contact', 'cel-phone', 'email', 'actions'];
  dataSource: Contact [] = [];

  contacts: any = [];
  size: number = 0;

  ifContact: boolean = true;
  //ifAddress: string = "";

  currentPage: number = 0;
  totalSize: number = 0;
  sizeOptions: any = [5, 10, 15];

  searchField: string = "Filtrar por empreiteiro";
  
  msg: string = "";
  disabled: boolean = false;
  addHidden: boolean = false;


  constructor(private contractorService:ContractorService, private cardService: CardService, 
    private router: Router, private authService: AuthService, private authGuardService: AuthGuardService, 
    private dialog: MatDialog, private filterService: FilterService, private paginatorService: PaginatorService,
    private snackBar:SnackBarService) {
      cardService.subtitle = {
        text: 'Lista de Contatos',
        icon: 'contact_page',
      }
  }

  ngOnInit(): void {
    this.getAll();
    this.authService.auth().subscribe(res => {
      if(res == null){
        this.router.navigate(['/login']);
        return
      }
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
      //(res.user.allowable_level > 3)?this.disabled=false:EMPTY;      
    })
  }

  public changePageSize(event: any){
    this.paginatorService.paginator.pageSize = event;  
    this.paginate(this.currentPage);
  }

  public paginate(event: any) {
    this.currentPage = event;
    this.dataSource = this.paginatorService.iterator(event, this.contacts);
  }

  public pageOrigin(){
    this.router.navigate(['/contratador/contato/cadastrar'])
    this.contractorService.origin.pageOrigin = true;
  }

  public search(event: string){
    if(event == ''){
      this.contacts = [];
      this.getAll();
      this.currentPage = 0;
      return
    }
    this.contacts = this.filterService.filterContractor(this.contacts, event);
    this.totalSize = this.contacts.length;
    this.currentPage = 0;
    this.paginate(this.currentPage);
  }

  public getAll(): void {
    this.contractorService.indexContractors().subscribe(res => {
      for(let i = 0; i < res.contractores.length; i++) {
        if(res.contractores[i].contacts.length == 0){
          this.contacts.push({
            id_contractor: res.contractores[i].id,
            contractor: res.contractores[i].name,
            disabled: false,
            disabledEdit: true,
          })
        }
        for(let j = 0; j < res.contractores[i].contacts.length; j++) {
          //this.disabled = true
          this.contacts.push({
            id: res.contractores[i].contacts[j].id,
            id_contractor: res.contractores[i].contacts[j].id_contractor,
            contractor: res.contractores[i].name,
            contact: res.contractores[i].contacts[j].contact,
            cel_phone: res.contractores[i].contacts[j].cel_phone,
            email: res.contractores[i].contacts[j].email,
            disabled: true,
            disabledEdit: false,
          })
        }
      }   
      if(this.paginatorService.paginator.pageSize == 0){
        this.paginatorService.paginator.pageSize = this.sizeOptions[0];
        this.totalSize = this.contacts.length;
      }
      this.totalSize = this.contacts.length;
      this.paginate(this.currentPage);
    })
  }

  public addContact(contact: any): void {
    const dialogRef = this.dialog.open(ContactDialogAddComponent,{
      data: {
        id_contractor: contact.id_contractor, 
        contractor: contact.contractor,
        contact_atction: 'Cadastrar',
      }
    })
    dialogRef.beforeClosed().subscribe( (res: boolean) => {
      this.cardService.subtitle.text = 'Lista de Contatos';
      this.cardService.subtitle.icon = 'contact_page';
    })
    dialogRef.afterClosed().subscribe( (res: boolean) => {
      this.contacts = [];
      this.getAll();
    })
  }

  public updateContact(contact: any, ): void {
    const dialogRef = this.dialog.open(ContactDialogAddComponent,{
      data: {
        id_contact: contact.id,
        id_contractor: contact.id_contractor, 
        contractor: contact.contractor,
        contact: contact.contact,
        cel_phone: contact.cel_phone,
        email: contact.email,
        contact_atction: 'Atualizar', 
      }
    })
    dialogRef.beforeClosed().subscribe( (res: boolean) => {
      this.cardService.subtitle.text = 'Lista de Contatos';
      //this.cardService.subtitle.icon = 'contact_page';
    })
    dialogRef.afterClosed().subscribe( (res: boolean) => {
      this.contacts = [];
      this.getAll();
    })
  }

  public deleteContact(contact: any): void {
      const dialogRef = this.dialog.open(ConfirmComponent,{
        data: `Confirma exluir! #Contato: ${contact.contact}`,
      }) 
    dialogRef.beforeClosed().subscribe( (res: boolean) => {
      if(res) {
        let error: boolean;
        this.contractorService.deleteContact(contact.id,this.authGuardService.guard.token).subscribe((res) => {
          res.error?this.msg = res.error.msg:this.msg= res.success.msg;
          error = res.error?true:false
          this.snackBar.showMessage(this.msg, error);
        })
        
      }
    })
    dialogRef.afterClosed().subscribe( (res: boolean) => {
      if(res) {
        setTimeout(() => {
          this.contacts = [];
          this.getAll();
        }, 500)     
      }
    })
  }
}
