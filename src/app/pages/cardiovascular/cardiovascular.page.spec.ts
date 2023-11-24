import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardiovascularPage } from './cardiovascular.page';

describe('CardiovascularPage', () => {
  let component: CardiovascularPage;
  let fixture: ComponentFixture<CardiovascularPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CardiovascularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
