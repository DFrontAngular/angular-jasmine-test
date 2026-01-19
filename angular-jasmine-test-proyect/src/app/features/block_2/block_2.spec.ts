import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Block2 } from './block_2';

describe('Block2', () => {
  let component: Block2;
  let fixture: ComponentFixture<Block2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Block2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Block2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
