import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarReservasComponent } from './mostrar-reservas.component';

describe('MostrarReservasComponent', () => {
  let component: MostrarReservasComponent;
  let fixture: ComponentFixture<MostrarReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostrarReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
