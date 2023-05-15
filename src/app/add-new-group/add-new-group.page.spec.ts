import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewGroupPage } from './add-new-group.page';

describe('AddNewGroupPage', () => {
  let component: AddNewGroupPage;
  let fixture: ComponentFixture<AddNewGroupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddNewGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
