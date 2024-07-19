import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetsFilterComponent } from './alphabets-filter.component';

describe('AlphabetsFilterComponent', () => {
  let component: AlphabetsFilterComponent;
  let fixture: ComponentFixture<AlphabetsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphabetsFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphabetsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
