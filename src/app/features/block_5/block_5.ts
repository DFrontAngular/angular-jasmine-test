import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-block-5',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block_5.html',
  styleUrl: './block_5.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class block_5 {

  readonly componentCode = `
@Component({
  selector: 'app-example',
  standalone: true,
  template: \`
    <button (click)="handleClick()">Click</button>
  \`
})
export class ExampleComponent {

  value = 0;

  handleClick(): void {
    this.increment();
    this.#log();
  }

  private increment(): void {
    this.value++;
  }

  #log(): void {
    console.log('Clicked');
  }
}
`;

  readonly wrongTestCode = `
it('should spy private method (bad practice)', () => {
  const fixture = TestBed.createComponent(ExampleComponent);
  const component = fixture.componentInstance;

  const spy = spyOn(component as any, 'increment').and.callThrough();

  component.handleClick();

  expect(spy).toBeTruthy();
});
`;

  readonly hashPrivateTestCode = `
it('should spy #private method (impossible)', () => {
  const fixture = TestBed.createComponent(ExampleComponent);
  const component = fixture.componentInstance;

  // Esto NO funciona:
  // spyOn(component as any, '#log')

  expect(true).toBeTrue();
});
`;

  readonly correctTestCode = `
it('should increase value when clicking button', () => {
  const fixture = TestBed.createComponent(ExampleComponent);
  const component = fixture.componentInstance;

  component.handleClick();

  expect(component.value).toBe(1);
});
`;
}