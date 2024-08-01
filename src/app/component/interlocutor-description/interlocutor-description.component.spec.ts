import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterlocutorDescriptionComponent } from './interlocutor-description.component';

describe('InterlocutorDescriptionComponent', () => {
  let component: InterlocutorDescriptionComponent;
  let fixture: ComponentFixture<InterlocutorDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterlocutorDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterlocutorDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
