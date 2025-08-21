import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { UserListComponent } from '../components/app-list/app-list';
import { User, UserService } from './user';

describe('UserListComponent (template tests)', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let component: UserListComponent;
  let mockUserService: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        suite: 'Apt 1',
        city: 'New York',
        zipcode: '10001',
        geo: { lat: '40.7128', lng: '-74.0060' }
      },
      phone: '555-1234',
      website: 'john.example.com',
      company: {
        name: 'Acme Corp',
        catchPhrase: 'Making things happen',
        bs: 'synergistic solutions'
      }
    }
  ];

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', [
      'getAllUsers',
      'getUserById',
      'updateUser',
      'deleteUser'
    ]);

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should show loading state and then the list of users', () => {
    // Simula respuesta del servicio
    mockUserService.getAllUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges(); // ngOnInit dispara loadUsers

    // Verifica que ya no está el loader
    const loadingEl = fixture.debugElement.query(By.css('.loading'));
    expect(loadingEl).toBeNull();

    // Verifica que hay un user-card en el DOM
    const userCards = fixture.debugElement.queryAll(By.css('.user-card'));
    expect(userCards.length).toBe(1);

    // Verifica datos renderizados
    const name = userCards[0].query(By.css('h3')).nativeElement.textContent;
    expect(name).toContain('John Doe');
  });

  it('should display an error if the service fails', () => {
    mockUserService.getAllUsers.and.returnValue(
      throwError(() => new Error('Error loading users'))
    );

    fixture.detectChanges(); // ngOnInit dispara loadUsers

    const errorEl = fixture.debugElement.query(By.css('.error'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent).toContain('Error loading users');
  });

  it('should load a specific user when clicking "Load User 1"', () => {
  mockUserService.getAllUsers.and.returnValue(of(mockUsers));
  mockUserService.getUserById.and.returnValue(of(mockUsers[0])); 

  fixture.detectChanges();

  const button = fixture.debugElement.query(By.css('.btn-secondary'));
  button.triggerEventHandler('click', null);
  fixture.detectChanges();

  const userCard = fixture.debugElement.query(By.css('.user-card'));
  expect(userCard.nativeElement.textContent).toContain('John Doe');
});


  it('should show empty state when there are no users', () => {
    mockUserService.getAllUsers.and.returnValue(of([]));

    fixture.detectChanges();

    const emptyState = fixture.debugElement.query(By.css('.empty-state'));
    expect(emptyState).toBeTruthy();
    expect(emptyState.nativeElement.textContent).toContain(
      'No hay usuarios para mostrar'
    );
  });

  it('should call updateUser when clicking the "Edit" button', () => {
    const updatedUser = { ...mockUsers[0], name: 'Usuario Actualizado 1' };
    mockUserService.getAllUsers.and.returnValue(of(mockUsers));
    mockUserService.updateUser.and.returnValue(of(updatedUser));

    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('.btn-edit'));
    editButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(mockUserService.updateUser).toHaveBeenCalledWith(1, {
      name: 'Usuario Actualizado 1',
      email: 'updated1@example.com'
    });

    const name = fixture.debugElement.query(By.css('.user-card h3'))
      .nativeElement.textContent;
    expect(name).toContain('Usuario Actualizado 1');
  });

  it('should delete a user when clicking the "Delete" button', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockUserService.getAllUsers.and.returnValue(of(mockUsers));
    mockUserService.deleteUser.and.returnValue(of({}));

    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('.btn-delete'));
    deleteButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);

    const userCards = fixture.debugElement.queryAll(By.css('.user-card'));
    expect(userCards.length).toBe(0);
  });
});
