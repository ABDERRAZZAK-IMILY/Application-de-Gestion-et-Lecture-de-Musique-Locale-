import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Audiocontroller } from './audiocontroller';

describe('Audiocontroller', () => {
  let component: Audiocontroller;
  let fixture: ComponentFixture<Audiocontroller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Audiocontroller]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Audiocontroller);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
