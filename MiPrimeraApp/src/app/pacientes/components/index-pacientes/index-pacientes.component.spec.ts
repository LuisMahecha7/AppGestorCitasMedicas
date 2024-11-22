import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPacientesComponent } from './index-pacientes.component';

describe('IndexPacientesComponent', () => {
  let component: IndexPacientesComponent;
  let fixture: ComponentFixture<IndexPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexPacientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
