import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Labrary } from './labrary';

describe('Labrary', () => {
  let component: Labrary;
  let fixture: ComponentFixture<Labrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Labrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Labrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
