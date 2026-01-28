import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-block-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block_1.html',
  styleUrl: './block_1.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Block1 {

}
