import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensiveComponents } from './expensive-components';

describe('ExpensiveComponents', () => {
  let component: ExpensiveComponents;
  let fixture: ComponentFixture<ExpensiveComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensiveComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensiveComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
