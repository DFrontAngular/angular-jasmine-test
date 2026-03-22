import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task, TaskItemComponent } from './task-item.component';

describe('TaskItemComponent', () => {
  let fixture: ComponentFixture<TaskItemComponent>;
  let component: TaskItemComponent;

  const mockTask: Task = {
    id: 1,
    title: 'Learn Angular Testing',
    completed: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
  });

  it('should render task title', () => {
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();

    const titleElement: HTMLElement = fixture.nativeElement.querySelector('[data-testid="title"]');

    expect(titleElement.textContent).toContain(mockTask.title);
  });

  it('should emit changeTask event when button is clicked', () => {
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();

    spyOn(component.changeTask, 'emit');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="changeTask"]');

    button.click();

    expect(component.changeTask.emit).toHaveBeenCalledWith(mockTask.id);
  });

  it('should emit changeTask event with task id', () => {
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();

    spyOn(component.changeTask, 'emit');

    component.changeTask.emit(mockTask.id);

    expect(component.changeTask.emit).toHaveBeenCalledWith(mockTask.id);
  });
});
