import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResistenciaPage } from './resistencia.page';

describe('ResistenciaPage', () => {
  let component: ResistenciaPage;
  let fixture: ComponentFixture<ResistenciaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
