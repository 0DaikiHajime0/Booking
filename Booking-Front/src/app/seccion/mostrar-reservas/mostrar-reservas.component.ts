import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ListarReservaService} from '../../services/listar-reserva.service';
import {ListarReservas} from './../../models/ListarReservas'
import { mostrarReserva } from '../../models/mostrarReservadocente';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/login.service';
import { Console } from 'console';

@Component({
  selector: 'app-mostrar-reservas',
  templateUrl: './mostrar-reservas.component.html',
  styleUrl: './mostrar-reservas.component.css'
})
export class MostrarReservasComponent implements AfterViewInit {
  docente!: Usuario
  listar!: ListarReservas;
   mostrar : mostrarReserva[] = [];

   displayedColumns: string[] = ['nrc', 'curso_nombre','recurso_nombre', 'tipo_autor', 'cantidad_reserva', 'bloque_nombre', 'bloque_rango', 'reserva_fecha', 'fecha_registro'/*,'acciones'*/];
  dataSource: MatTableDataSource<mostrarReserva>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.obtenerDocente();
    this.listarReservas();
  }

  constructor(
    private ListarReservaService: ListarReservaService,
    private usuarioservice: UsuarioService,
  ) {

    this.paginator = {} as MatPaginator;
    this.sort = {} as MatSort;
    this.dataSource = new MatTableDataSource();
  }

  obtenerDocente(): void {
    this.docente = this.usuarioservice.getUsuarioFromStorage()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  listarReservas() {
    this.listar = {
      id_docente:this.docente.usuario_id,
      id_bloques:null,
      fechaReservaInicio:null,
      fechaReservaFin:null,
      fechaRegistroInicio:null,
      fechaRegistroFin:null,
    }
    this.ListarReservaService.listarreservas(this.listar).subscribe(
      (reservas: mostrarReserva[]) => {
        this.dataSource.data = reservas.map(reserva => ({
          ...reserva,
          reserva_fecha: this.formatDate(reserva.reserva_fecha),
          fecha_registro: this.formatDateTime(reserva.fecha_registro)
        }));
      },
      error => {
        console.error('Error al cargar las reservas: ', error);
      }
    );
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  formatDateTime(dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toISOString().split('T')[0];
    const time = dateTime.toLocaleTimeString();
    return `${date} ${time}`;
  }
/*  enviarCorreo(row: any) {
    console.log('Datos de la fila para enviar el correo:', row);
  }*/

}

