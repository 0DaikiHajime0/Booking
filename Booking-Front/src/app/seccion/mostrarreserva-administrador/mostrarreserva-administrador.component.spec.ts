import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarreservaAdministradorComponent } from './mostrarreserva-administrador.component';

describe('MostrarreservaAdministradorComponent', () => {
  let component: MostrarreservaAdministradorComponent;
  let fixture: ComponentFixture<MostrarreservaAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostrarreservaAdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarreservaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
