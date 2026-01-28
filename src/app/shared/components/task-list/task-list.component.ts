import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit
} from '@angular/core';
import { Task, TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './task-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];

    constructor(private readonly taskService: TaskService) { }

    ngOnInit(): void {
        this.taskService.getTasks().subscribe(tasks => {
            this.tasks = tasks;
        });
    }
}
