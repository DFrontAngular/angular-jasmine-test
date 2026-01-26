import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-block-3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block_3.html',
  styleUrl: './block_3.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Block3 {
   readonly taskServiceCode = `
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = '/api/tasks';

  constructor(private readonly http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
}
`;

  readonly taskServiceTestCode = `
describe('TaskService', () => {
  it('should fetch tasks from API', () => {
    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('GET');

    req.flush(mockTasks);
  });
});
`;

  readonly taskListComponentCode = `
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <ul>
      @for (task of tasks; track task.id) {
        <li data-testid="task">
          {{ task.title }}
        </li>
      }
    </ul>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}
`;

  readonly taskListTestCode = `
beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: () =>
              of([
                { id: 1, title: 'Task one', completed: false },
                { id: 2, title: 'Task two', completed: true }
              ])
          }
        }
      ]
    }).compileComponents();
  });

  it('should render tasks from API', () => {
    const fixture = TestBed.createComponent(TaskListComponent);

    fixture.detectChanges(); // ngOnInit + subscribe

    const items = fixture.nativeElement.querySelectorAll(
      '[data-testid="task"]'
    );

    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Task one');
  });
`;
}
