import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Task, TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const mockTasks: Task[] = [
    { id: 1, title: 'Learn testing', completed: false },
    { id: 2, title: 'Write tests', completed: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // TODO: Revisar un test que se quede colgado si no pones verify
  afterEach(() => {
    httpMock.verify();
  });

  // FIXME: Revisar, da falso positivo
  it('should fetch tasks from API', () => {
    service.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('GET');

    req.flush(mockTasks);
  });

  it('should handle error when API fails', () => {
    service.getTasks().subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne('/api/tasks');
    req.flush('Server error', { status: 500, statusText: 'Server Error' });
  });
});
