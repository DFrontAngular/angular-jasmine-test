import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Block1 } from './block_1';

describe('Block1', () => {
  let component: Block1;
  let fixture: ComponentFixture<Block1>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Block1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Block1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
