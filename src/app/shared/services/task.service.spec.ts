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

  afterEach(() => {
    httpMock.verify();
  });

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

  xit('would hang if the request is never resolved', (done: DoneFn) => {
    service.getTasks().subscribe({
      next: () => {
        done.fail('the request should remain pending in this example');
      },
      error: () => {
        done.fail('the request should remain pending in this example');
      },
      complete: () => {
        done.fail('the request should remain pending in this example');
      },
    });

    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('GET');

    // Si no hacemos req.flush(...) ni req.error(...),
    // el observable no emite y done() nunca se ejecuta.
    // Este ejemplo se deja deshabilitado para no colgar la suite.
  });
});
