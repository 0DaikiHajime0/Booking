import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrearReservaServiceService } from '../../services/crear-reserva.service.service';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Disponibilidad } from '../../models/Disponibilidad';
import { Reserva } from '../../models/Reserva';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/login.service';
import { Asignatura } from '../../models/Asignatura';
import { Recurso } from '../../models/Recurso';
import { Bloques } from '../../models/Bloques';
import { MatSnackBar } from '@angular/material/snack-bar';
import esLocale from '@fullcalendar/core/locales/es';
@Component({
  selector: 'app-crearreserva-administrador',
  templateUrl: './crearreserva-administrador.component.html',
  styleUrl: './crearreserva-administrador.component.css'
})
export class CrearreservaAdministradorComponent {

  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    weekends: true,
    locale: esLocale,
    events: [
    ]
  };

}
