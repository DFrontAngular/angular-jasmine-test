import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  readonly task = input.required<Task>();
  readonly changeTask = output<number>();
}
