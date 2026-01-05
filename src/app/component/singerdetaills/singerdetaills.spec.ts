import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Singerdetaills } from './singerdetaills';

describe('Singerdetaills', () => {
  let component: Singerdetaills;
  let fixture: ComponentFixture<Singerdetaills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Singerdetaills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Singerdetaills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
