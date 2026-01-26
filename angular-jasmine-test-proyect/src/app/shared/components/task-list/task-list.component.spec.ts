import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {

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
});
