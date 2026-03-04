import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-block-final',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block_final.html',
  styleUrl: './block_final.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class block_final {
     testingPyramid = `
┌────────────────────────────┐
│ E2E (muy pocos)            │
├────────────────────────────┤
│ Integración UI (clave)     │
├────────────────────────────┤
│ Unit tests (selectivos)    │
└────────────────────────────┘
`;

  taskListSpec = `
it('should render tasks from API', async () => {
  await fixture.whenStable();
  fixture.detectChanges();

  const items = fixture.nativeElement
    .querySelectorAll('[data-testid="task"]');

  expect(items.length).toBe(2);
});
`;

  routingSpec = `
it('should navigate to tasks page', async () => {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl('/tasks');

  const title = harness.routeNativeElement
    ?.querySelector('[data-testid="tasks-title"]');

  expect(title).not.toBeNull();
});
`;

  guardSpec = `
it('should block access for non-admin users', async () => {
  const result = await adminGuard(route, state);
  expect(result).toBeFalse();
});
`;

  serviceSpec = `
it('should return completed tasks', () => {
  const result = service.getCompleted(tasks);
  expect(result.length).toBe(2);
});
`;

  whatNotToTest = `
❌ HTML estático
❌ Propiedades internas del componente
❌ Métodos privados
❌ Getters / setters triviales
`;

  testSelectors = `
❌ querySelector('.task-item > span:nth-child(2)')
✅ querySelector('[data-testid="task"]')
`;

  asyncTesting = `
await fixture.whenStable();
fixture.detectChanges();
`;

  httpTesting = `
providers: [
  provideHttpClient(),
  provideHttpClientTesting()
]

httpMock.expectOne('/api/tasks')
  .flush(mockTasks);
`;

}