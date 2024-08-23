import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicanteditComponent } from './applicantedit.component';

describe('ApplicanteditComponent', () => {
  let component: ApplicanteditComponent;
  let fixture: ComponentFixture<ApplicanteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicanteditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicanteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
