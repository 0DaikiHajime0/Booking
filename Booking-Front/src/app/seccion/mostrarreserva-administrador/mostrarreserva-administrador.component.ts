import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListarReservaService } from '../../services/listar-reserva.service';
import { ListarReservasAdmin } from './../../models/ListarReservasAdministrador'
import { mostrarReservaAdmin } from '../../models/mostrarReservaAdministrador';
import { Recurso } from '../../models/Recurso'
import { Bloques } from '../../models/Bloques';



@Component({
  selector: 'app-mostrarreserva-administrador',
  templateUrl: './mostrarreserva-administrador.component.html',
  styleUrl: './mostrarreserva-administrador.component.css'

})
export class MostrarreservaAdministradorComponent implements AfterViewInit {

  selectedRecurso?: number | null;
  selectedBloque?: number | null;
  selectedEstado?: string | null;
  selectedFechaReservaInicio?: Date|null;
  selectedFechaReservaFin?: Date|null;
  selectedFechaRegistroInicio?: Date|null;
  selectedFechaRegistroFin?: Date|null;

  listar!: ListarReservasAdmin;
  mostrar: mostrarReservaAdmin[] = [];
  recurso: Recurso[] = [];
  bloques: Bloques[] = [];
  loading: boolean = true;


  displayedColumns: string[] = ['reserva_id', 'nrc', 'curso_nombre', 'recurso_nombre', 'docente_nombre', 'tipo_autor', 'cantidad_reserva', 'bloque_nombre', 'bloque_rango', 'reserva_fecha', 'fecha_registro', 'reserva_estado'];
  dataSource: MatTableDataSource<mostrarReservaAdmin>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.listarReservas();
    this.listarRecurso();
    this.listarBloques();
  }

  constructor(
    private ListarReservaService: ListarReservaService,

  ) {

    this.paginator = {} as MatPaginator;
    this.sort = {} as MatSort;
    this.dataSource = new MatTableDataSource();
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
  listarRecurso() {
    this.ListarReservaService.listarRecursosAdmin().subscribe(
      (recursos: Recurso[]) => {
        console.log(recursos);
        this.recurso = recursos;
      }
    );
  }
  listarBloques() {
    this.ListarReservaService.listarBloques().subscribe(
      (bloques: Bloques[]) => {
        this.bloques = bloques
      })
  }
  listarReservas() {
    this.loading = true;
    this.listar = {
      id_docente: null,
      id_recurso : this.selectedRecurso,
      id_bloques: this.selectedBloque,
      fechaReservaInicio: this.selectedFechaReservaInicio?.toISOString().split('T')[0],
      fechaReservaFin: this.selectedFechaReservaFin?.toISOString().split('T')[0],
      fechaRegistroInicio: this.selectedFechaRegistroInicio?.toISOString().split('T')[0],
      fechaRegistroFin: this.selectedFechaRegistroFin?.toISOString().split('T')[0],
      estado_reserva: this.selectedEstado,
    };
    console.log(this.selectedFechaReservaInicio?.toISOString().split('T')[0], this.selectedFechaReservaFin?.toISOString().split('T')[0]);
    this.ListarReservaService.listarReservaAdmin(this.listar).subscribe(
      (reservas: mostrarReservaAdmin[]) => {
        this.dataSource.data = reservas.map(reserva => ({
          ...reserva,
          reserva_fecha: this.formatDate(reserva.reserva_fecha),
          fecha_registro: this.formatDateTime(reserva.fecha_registro)
        }));
        this.loading = false;
      },
      error => {
        console.error('Error al cargar las reservas: ', error);
        this.loading = false;
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
}
