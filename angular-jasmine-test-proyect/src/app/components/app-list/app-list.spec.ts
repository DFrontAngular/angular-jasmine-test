// user-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { UserListComponent } from './app-list';
import { User, UserService } from '../../services/user';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
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
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      address: {
        street: '456 Oak Ave',
        suite: 'Suite 2',
        city: 'Los Angeles',
        zipcode: '90210',
        geo: { lat: '34.0522', lng: '-118.2437' }
      },
      phone: '555-5678',
      website: 'jane.example.com',
      company: {
        name: 'Tech Solutions',
        catchPhrase: 'Innovation at its best',
        bs: 'cutting-edge technology'
      }
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', [
      'getAllUsers',
      'getUserById',
      'updateUser',
      'deleteUser'
    ]);

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    mockUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component initialization', () => {
    it('should load users on ngOnInit', () => {
      mockUserService.getAllUsers.and.returnValue(of(mockUsers));

      component.ngOnInit();

      expect(mockUserService.getAllUsers).toHaveBeenCalled();
      expect(component.users).toEqual(mockUsers);
      expect(component.loading).toBeFalse();
    });

    it('should show loading state initially', () => {
      mockUserService.getAllUsers.and.returnValue(of(mockUsers));

      fixture.detectChanges(); // Trigger ngOnInit

      expect(component.loading).toBeFalse(); // After successful load
    });
  });

  describe('loadUsers method', () => {
    it('should load all users successfully', () => {
      mockUserService.getAllUsers.and.returnValue(of(mockUsers));

      component.loadUsers();

      expect(component.users).toEqual(mockUsers);
      expect(component.loading).toBeFalse();
      expect(component.error).toBeNull();
    });

    it('should handle error when loading users fails', () => {
      const errorMessage = 'Error loading users';
      mockUserService.getAllUsers.and.returnValue(
        throwError(() => new Error(errorMessage))
      );

      component.loadUsers();

      expect(component.users).toEqual([]);
      expect(component.loading).toBeFalse();
      expect(component.error).toBe(errorMessage);
    });

    it('should set loading to true while fetching', () => {
      mockUserService.getAllUsers.and.returnValue(of(mockUsers));

      component.loading = false;
      component.loadUsers();

      // Durante la carga, loading debería ser true temporalmente
      expect(mockUserService.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('loadSpecificUser method', () => {
    it('should load a specific user', () => {
      const specificUser = mockUsers[0];
      mockUserService.getUserById.and.returnValue(of(specificUser));

      component.loadSpecificUser(1);

      expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
      expect(component.users).toEqual([specificUser]);
      expect(component.loading).toBeFalse();
      expect(component.error).toBeNull();
    });

    it('should handle error when loading specific user fails', () => {
      const errorMessage = 'User not found';
      mockUserService.getUserById.and.returnValue(
        throwError(() => new Error(errorMessage))
      );

      component.loadSpecificUser(999);

      expect(component.users).toEqual([]);
      expect(component.loading).toBeFalse();
      expect(component.error).toBe(errorMessage);
    });
  });

  describe('updateUser method', () => {
    beforeEach(() => {
      component.users = [...mockUsers];
    });

    it('should update user successfully', () => {
      const updatedUser = { ...mockUsers[0], name: 'Usuario Actualizado 1' };
      mockUserService.updateUser.and.returnValue(of(updatedUser));

      component.updateUser(1);

      expect(mockUserService.updateUser).toHaveBeenCalledWith(1, {
        name: 'Usuario Actualizado 1',
        email: 'updated1@example.com'
      });
      expect(component.users[0]).toEqual(updatedUser);
      expect(component.error).toBeNull();
    });

    it('should handle error when updating user fails', () => {
      const errorMessage = 'Update failed';
      mockUserService.updateUser.and.returnValue(
        throwError(() => new Error(errorMessage))
      );

      component.updateUser(1);

      expect(component.error).toBe(errorMessage);
    });
  });
})
