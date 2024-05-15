import { Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recurso } from '../../models/Recurso';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Licencia } from '../../models/Licencias';
import { RecursoService } from '../../services/recurso.service';
import { Dialog } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { s } from '@fullcalendar/core/internal-common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import { parse } from 'csv-parse';

@Component({
  selector: 'app-credenciales',
  templateUrl: './credenciales.component.html',
  styleUrl: './credenciales.component.css'
})
export class CredencialesComponent {
  recursos: Recurso[] = [];
  credenciales: Licencia[] = [];
  columnasCredenciales:string[] = ['credencial_id','credencial_usuario','credencial_contrasena','credencial_key','credenciales_estado','editar']
  dataSourceCredenciales!: MatTableDataSource<Licencia>
  recursoSeleccionado!:Recurso
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _snackBar: MatSnackBar,
    private recursoService:RecursoService,
    private dialog:MatDialog
  ) {
    this.getRecursos()
  }
  CredencialFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSourceCredenciales.filter = filterValue.trim().toLowerCase();
  }
  async getRecursos(){
    this.recursos = await this.recursoService.getRecursos()
  }
  async onChange(event:any) {
    try {
      this.credenciales = await this.recursoService.getLicencias(this.recursoSeleccionado.recurso_id);
      this.dataSourceCredenciales = new MatTableDataSource<Licencia>(this.credenciales);     this.dataSourceCredenciales.paginator = this.paginator;
    } catch (error) {
      console.error('Error al obtener asignaturas:', error);
    }
    }
  async agregarCredencial(){
    const recurso = this.recursoSeleccionado;
    if(recurso){
      const dialogRef = this.dialog.open(NuevaCredencial,{
        data:{recurso}
      })
      dialogRef.afterClosed().subscribe(
        async result=>{
          if(result){
            await this.recursoService.guardarLicencia(result, recurso.recurso_id);
            this.credenciales = await this.recursoService.getLicencias(this.recursoSeleccionado.recurso_id);
            this.dataSourceCredenciales = new MatTableDataSource<Licencia>(this.credenciales);
          }
        }
      )
    }
  }
  async agregarCredenciales(){
    const recurso = this.recursoSeleccionado;
    console.log(recurso)
    if(this.recursoSeleccionado){
      const dialogRef = this.dialog.open(NuevoGrupoCredenciales,{
        data:{recurso}
      })
      dialogRef.afterClosed().subscribe(
        async result=>{
          if(result){
            this.credenciales = await this.recursoService.getLicencias(this.recursoSeleccionado.recurso_id);
            this.dataSourceCredenciales = new MatTableDataSource<Licencia>(this.credenciales);
          }
        }
      )
    }
  }
  
  async editarCredencial(licencia:Licencia){
    const recurso = this.recursoSeleccionado;
    if(licencia){
      const dialogRef = this.dialog.open(NuevaCredencial,{
        data:{licencia,recurso}
      })
      dialogRef.afterClosed().subscribe(
        async result=>{
          if(result){
            this.recursoService.editarLicencia(result)
            this.credenciales = await this.recursoService.getLicencias(this.recursoSeleccionado.recurso_id)
            this.dataSourceCredenciales = new MatTableDataSource<Licencia>(this.credenciales)
          }
        }
      )
    }
  }
}
@Component({
  selector: 'app-nueva-credencial',
  templateUrl: './nueva-credencial.html',
  styleUrls:['../usuarios/editar-usuario.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule
  ],
})
export class NuevaCredencial{
  recurso!: Recurso; 
  credencial = {
    credenciales_id: 0,
    credencial_contrasena: '',
    credencial_key: '',
    credencial_usuario: '',
    credenciales_estado: ''
  };

  constructor(
    public dialogRef: MatDialogRef<NuevaCredencial>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.recurso = data.recurso;
  }
  cerrar(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'app-nueva-credenciales',
  templateUrl: './nueva-credenciales.html',
  styleUrls:['../credenciales/credenciales.component.css'],

  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule
  ],
})
export class NuevoGrupoCredenciales{
  previewContent: string | ArrayBuffer | null = null;
  archivoCSV: File | null = null;
  recurso!: Recurso; 
  credencial = {
    credenciales_id: 0,
    credencial_contrasena: '',
    credencial_key: '',
    credencial_usuario: '',
    credenciales_estado: ''
  };
  usuariostring = false;
  passstring = false;
  clavestring = false;
  csvContent: string = '';
  cantidadComas:number=0;
  advertenciaComas:string=''
  constructor(
    public dialogRef: MatDialogRef<NuevoGrupoCredenciales>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recursoService:RecursoService,
    private _snackBar: MatSnackBar

  ){
    this.recurso = data.recurso;
    
  }
  cerrar(): void {
    this.dialogRef.close();
  }
  subircsv(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      this.previewContent = e.target.result;
      this.csvContent = e.target.result;
    };
    reader.readAsText(file);
  }
  descargar_ejemplo(): void {
    this.recursoService.descargarCsv().subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'credenciales_ejemplo.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      (error) => {
        console.error('Error al descargar el archivo:', error);
      }
    );
  }
  analizarCsv(csvContent:string){
    const filas = csvContent.split('\n');
    const comasPorFila = [];
    let filasConMenosDeTresComas = false;
    
    for (let fila of filas) {
      const cantidadComas = (fila.match(/,/g) || []).length;
      comasPorFila.push(cantidadComas);
      
      if (cantidadComas <= 2) {
        filasConMenosDeTresComas = true;
      }
    }
      if (filasConMenosDeTresComas) {
      this.advertenciaComas = 'Debe existir un mínimo de 3 comas por fila en el csv';
    } else {
      this.advertenciaComas = '';
    }
  }
  
  
  guardar(): void {
    if (this.csvContent) {
      const blob = new Blob([this.csvContent], { type: 'text/csv' });
      const editedFile = new File([blob], 'edited.csv');

      const formData = new FormData();
      formData.append('file', editedFile);

      this.recursoService.enviarcsvCredenciales(formData, this.recurso.recurso_id)
        .subscribe(
          (response) => {
           this.cerrar()
           this._snackBar.open('Se ha subido correctamente', 'Cerrar', {
            duration: 2000, 
          });
          },
          (error) => {
            this._snackBar.open('Ha ocurrido un error, verifica file', 'Cerrar', {
              duration: 3000, 
            });
          }
        );
    }
  }
}