import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerdidaPesoPage } from './perdida-peso.page';

describe('PerdidaPesoPage', () => {
  let component: PerdidaPesoPage;
  let fixture: ComponentFixture<PerdidaPesoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PerdidaPesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
