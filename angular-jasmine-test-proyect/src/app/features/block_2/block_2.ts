import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-block-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block_2.html',
  styleUrl: './block_2.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Block2 {

}
