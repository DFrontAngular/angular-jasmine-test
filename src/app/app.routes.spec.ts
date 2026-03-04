import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { appRoutes } from './app.routes';

describe('App routing', () => {

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(appRoutes)]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should redirect "" to /home', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/');

    expect(router.url).toBe('/home');
  });

  it('should navigate to home page', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/home');

    const title = harness.routeNativeElement
      ?.querySelector('[data-testid="home-title"]');

    expect(title).not.toBeNull();
    expect(router.url).toBe('/home');
  });

    it('should navigate to bloque-1', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/bloque-1');

    expect(router.url).toBe('/bloque-1');
  });

  it('should navigate to bloque-2', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/bloque-2');

    expect(router.url).toBe('/bloque-2');
  });

  it('should navigate to bloque-3', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/bloque-3');

    expect(router.url).toBe('/bloque-3');
  });

    it('should navigate to bloque-4', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/bloque-4');

    expect(router.url).toBe('/bloque-4');
  });

  it('should navigate to bloque-5', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/bloque-5');

    expect(router.url).toBe('/bloque-5');
  });

  it('should navigate to bloque-6', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/bloque-6');

    expect(router.url).toBe('/bloque-6');
  });

  it('should navigate to bloque-7', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/bloque-7');

    expect(router.url).toBe('/bloque-7');
  });


  it('should navigate to bloque-final', async () => {
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/bloque-final');

    expect(router.url).toBe('/bloque-final');
  });

});