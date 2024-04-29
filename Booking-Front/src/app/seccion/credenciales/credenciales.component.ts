import { Component, Inject } from '@angular/core';
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

@Component({
  selector: 'app-credenciales',
  templateUrl: './credenciales.component.html',
  styleUrl: './credenciales.component.css'
})
export class CredencialesComponent {
  recursos: Recurso[] = [];
  credenciales: Licencia[] = [];
  columnasCredenciales:string[] = ['credencial_id','credencial_usuario','credencial_contrasena','credencial_key','credenciales_estado']
  dataSourceCredenciales!: MatTableDataSource<Licencia>
  recursoSeleccionado!:Recurso
  constructor(
    private _snackBar: MatSnackBar,
    private recursoService:RecursoService,
    private dialog:MatDialog
  ) {
    this.getRecursos()
  }
  async getRecursos(){
    this.recursos = await this.recursoService.getRecursos()
  }
  async onChange(event:any) {
    try {
      this.credenciales = await this.recursoService.getLicencias(this.recursoSeleccionado.recurso_id);
      this.dataSourceCredenciales = new MatTableDataSource<Licencia>(this.credenciales);
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
            this.recursoService.guardarLicencia(result,recurso.recurso_id);
            this.credenciales = await this.recursoService.getLicencias(this.recursoSeleccionado.recurso_id);
            this.dataSourceCredenciales = new MatTableDataSource<Licencia>(this.credenciales);

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