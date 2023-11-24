import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntensidadPage } from './intensidad.page';

describe('IntensidadPage', () => {
  let component: IntensidadPage;
  let fixture: ComponentFixture<IntensidadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IntensidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
