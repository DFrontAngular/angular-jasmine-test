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
  readonly taskItemCode = `
@Component({
  selector: 'app-task-item',
  standalone: true,
  template: \`
    <div class="task">
      <span
        data-testid="title"
        [class.completed]="task.completed"
      >
        {{ task.title }}
      </span>

      <button
        type="button"
        data-testid="toggle"
        (click)="toggle.emit(task.id)"
      >
        Toggle
      </button>
    </div>
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() toggle = new EventEmitter<number>();
}
`;

  readonly taskItemTestCode = `
describe('TaskItemComponent', () => {
  let fixture: ComponentFixture<TaskItemComponent>;
  let component: TaskItemComponent;

  const mockTask: Task = {
    id: 1,
    title: 'Learn Angular Testing',
    completed: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
  });

  it('should render task title', () => {
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();

    const titleElement: HTMLElement =
      fixture.nativeElement.querySelector('[data-testid="title"]');

    expect(titleElement.textContent).toContain(mockTask.title);
  });

  it('should emit toggle event when button is clicked', () => {
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();

    spyOn(component.toggle, 'emit');

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('[data-testid="toggle"]');

    button.click();

    expect(component.toggle.emit).toHaveBeenCalledWith(mockTask.id);
  });
});
`;
}
