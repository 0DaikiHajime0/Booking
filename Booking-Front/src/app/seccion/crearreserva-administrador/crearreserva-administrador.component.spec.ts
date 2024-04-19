import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearreservaAdministradorComponent } from './crearreserva-administrador.component';

describe('CrearreservaAdministradorComponent', () => {
  let component: CrearreservaAdministradorComponent;
  let fixture: ComponentFixture<CrearreservaAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearreservaAdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearreservaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
