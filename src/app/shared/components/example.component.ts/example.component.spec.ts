import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ExampleComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should increment value on click', async () => {
    const fixture = TestBed.createComponent(ExampleComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('button')
    );

    button.nativeElement.click();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.value).toBe(1);
  });

  it('should spy #private method (impossible)', () => {
  const fixture = TestBed.createComponent(ExampleComponent);
  const component = fixture.componentInstance;

  component.handleClick();

  expect(component.value).toBe(1);

});

  it('should reflect value in DOM', async () => {
    const fixture = TestBed.createComponent(ExampleComponent);

    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('button')
    );

    button.nativeElement.click();

    await fixture.whenStable();
    fixture.detectChanges();

    const text = fixture.nativeElement
      .querySelector('[data-testid="value"]');

    expect(text.textContent).toContain('1');
  });

});