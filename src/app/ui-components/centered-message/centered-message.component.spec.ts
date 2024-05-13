import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenteredMessageComponent } from './centered-message.component';

describe('CenteredMessageComponent', () => {
  let component: CenteredMessageComponent;
  let fixture: ComponentFixture<CenteredMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CenteredMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CenteredMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
