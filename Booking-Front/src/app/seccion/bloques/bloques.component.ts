import { Component, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Bloques } from '../../models/Bloques';
import { CrearReservaServiceService } from '../../services/crear-reserva.service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RecursoService } from '../../services/recurso.service';

@Component({
  selector: 'app-bloques',
  templateUrl: './bloques.component.html',
  styleUrl: './bloques.component.css'
})
export class BloquesComponent {
  bloqueSeleccionado!:Bloques;
  bloques!:Bloques[];
  dsBloques!: MatTableDataSource<Bloques>;
  columnaBloques:string[]=['bloque_id','bloque_nombre','bloque_rango','bloque_orden','bloque_editar']
  constructor(
    private bloquesService:CrearReservaServiceService,
    private recursoService:RecursoService,
    private dialog:MatDialog

  ){
    this.getBloques()
  }
async getBloques(){
  this.bloquesService.listarBloques().subscribe(
    (result) => {
      this.bloques = result
      this.dsBloques = new MatTableDataSource<Bloques>(this.bloques)
    })
}
async editarBloque(bloque:Bloques){
    const dialogRef = this.dialog.open(EditarBloque,{
      data:{bloque}
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.recursoService.editarBloque(result).subscribe(()=>{
          this.getBloques()
        })
        
      }
    })
  }
async nuevoBloque(){
  const dialogRef = this.dialog.open(EditarBloque,
    {data:'nuevo'}
  )
  dialogRef.afterClosed().subscribe(result=>{
    if(result){
      this.recursoService.nuevoBloque(result).subscribe(()=>{
        this.getBloques();
      })
    }
  })
}  
}

@Component({
  selector:'editar-bloque',
  templateUrl:'./editar.bloque.component.html',
  standalone:true,
  styleUrls:['../usuarios/editar-usuario.css'],
  imports:[
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule
  ]
})
export class EditarBloque{
  bloqueEditado!:Bloques
  title:string='Editar'
  constructor(
    public dialogRef:MatDialogRef<EditarBloque>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){
    this.bloqueEditado={...data.bloque}
    if(data=='nuevo'){
      this.title ='Nuevo'
    }
  }
  cancelar():void{
    this.dialogRef.close();
  }
}