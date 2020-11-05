import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Contacto } from '../core/modelos/contacto.model';
import { ApiService } from '../core/service/api.service';
import { startWith, tap, map, share, switchMap, take } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateContactComponent } from './create-contact/create-contact.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  openedMenu: boolean = false;
  contactos$: Observable<Contacto[]>
  
  //Table
  dataSource = new MatTableDataSource<Contacto>();
  displayedColumns: string[] = ['index', 'nombreCompleto','telefonos',  'email','nombre','descripcion','mediosContacto', 'progamas_cargo',   'actions']
  
  @ViewChild('paginator', { static: false }) set content(paginator1: MatPaginator) {
    this.dataSource.paginator = paginator1;
  }
  constructor(
    public dbs: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.contactos$ = this.dbs.getData().pipe(
      tap(data => {
        this.dataSource.data = data.data
        console.log(data);
        
        
      })
    );
  }

  getList(){
    this.dataSource.filterPredicate =
    (data: Contacto, filter: string) => {                    
      return data.nombreCompleto.toLowerCase().includes(filter)
    }
    this.contactos$ = this.dbs.getData().pipe(
      tap(data => {
        this.dataSource.data = data.data
        console.log(data);
        
        
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleSideMenu(): void {
    this.openedMenu = !this.openedMenu;
  }

  
  onDeleteItem(item: Contacto) {

   
  }

  onCreateEditItem(edit: boolean, item?: Contacto) {
    let dialogRef: MatDialogRef<CreateContactComponent>;
    dialogRef = this.dialog.open(CreateContactComponent, {
      width: '350px',
      data: {
        data: { ...item },
        edit: edit
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.getList()
      }
    })
  }
}
