import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component
} from '@angular/core';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="example">
      <p data-testid="value">
        Valor: {{ value }}
      </p>

      <button (click)="handleClick()">
        Click
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
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