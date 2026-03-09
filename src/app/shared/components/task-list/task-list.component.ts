import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  readonly #taskService = inject(TaskService);

  // Si ponemos esta variable protected nos obligamos a testearlo desde el DOM
  protected tasks: Task[] = [];

  ngOnInit(): void {
    this.getTasks();
  }

  protected getTasks(): void {
    this.#taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
    });
  }
}
