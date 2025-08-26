import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { UserListComponent } from './app-list';
import { User, UserService } from '../../../core/services/user';

describe('UserListComponent - integración mockeada', () => {
    let fixture: ComponentFixture<UserListComponent>;
    let component: UserListComponent;
    let userServiceMock: jasmine.SpyObj<UserService>;

    const mockUsers: User[] = [
        {
            id: 1,
            name: 'Juan Pérez',
            username: 'juanp',
            email: 'juan@test.com',
            address: { street: 'Calle Falsa', suite: 'Apt 1', city: 'Madrid', zipcode: '28080', geo: { lat: '0', lng: '0' } },
            phone: '123456789',
            website: 'juan.com',
            company: { name: 'EmpresaX', catchPhrase: 'Innovando', bs: 'tech' }
        }
    ];

    beforeEach(async () => {
        userServiceMock = jasmine.createSpyObj('UserService', [
            'getAllUsers',
            'getUserById',
            'updateUser',
            'deleteUser'
        ]);

        await TestBed.configureTestingModule({
            imports: [UserListComponent],
            providers: [
                { provide: UserService, useValue: userServiceMock } // aquí ya no usamos el servicio real
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
    });


    it('debería mostrar usuarios al pulsar "Cargar Usuarios"', fakeAsync(() => {
        userServiceMock.getAllUsers.and.returnValue(of(mockUsers));

        fixture.detectChanges();

        const loadBtn = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
        loadBtn.click();

        tick();
        fixture.detectChanges();

        const userCards = fixture.debugElement.queryAll(By.css('.user-card'));
        expect(userCards.length).toBe(1);
        expect(userCards[0].nativeElement.textContent).toContain('Juan Pérez');
    }));

    it('debería mostrar error si el servicio falla', fakeAsync(() => {
        userServiceMock.getAllUsers.and.returnValue(throwError(() => new Error('Error de prueba')));

        fixture.detectChanges();

        const loadBtn = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
        loadBtn.click();

        tick();
        fixture.detectChanges();

        const errorEl = fixture.debugElement.query(By.css('.error'));
        expect(errorEl).toBeTruthy();
        expect(errorEl.nativeElement.textContent).toContain('Error de prueba');
    }));
});
