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
            'deleteUser',
            'createUser'
        ]);

        await TestBed.configureTestingModule({
            imports: [UserListComponent],
            providers: [
                { provide: UserService, useValue: userServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;

        // 🔹 Mock obligatorio antes de detectChanges
        userServiceMock.getAllUsers.and.returnValue(of([]));

        fixture.detectChanges();
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

    it('debería crear un nuevo usuario al enviar el formulario', fakeAsync(() => {
        const mockNewUser: User = {
            id: 99,
            name: 'Nuevo Usuario',
            username: 'nuevo',
            email: 'nuevo@test.com',
            address: {
                street: '',
                suite: '',
                city: 'Barcelona',
                zipcode: '',
                geo: { lat: '', lng: '' }
            },
            phone: '',
            website: '',
            company: {
                name: 'NuevaEmpresa',
                catchPhrase: '',
                bs: ''
            }
        };


        userServiceMock.createUser.and.returnValue(of(mockNewUser));

        fixture.detectChanges();

        // Abrir formulario
        const newBtn = fixture.debugElement.queryAll(By.css('.btn-primary'))[1].nativeElement;
        newBtn.click();
        fixture.detectChanges();

        // Rellenar campos
        const nameInput = fixture.debugElement.query(By.css('[formControlName="name"]')).nativeElement;
        const emailInput = fixture.debugElement.query(By.css('[formControlName="email"]')).nativeElement;
        const usernameInput = fixture.debugElement.query(By.css('[formControlName="username"]')).nativeElement;
        const cityInput = fixture.debugElement.query(By.css('[formControlName="city"]')).nativeElement;
        const companyInput = fixture.debugElement.query(By.css('[formControlName="company"]')).nativeElement;

        nameInput.value = 'Nuevo Usuario'; nameInput.dispatchEvent(new Event('input'));
        emailInput.value = 'nuevo@test.com'; emailInput.dispatchEvent(new Event('input'));
        usernameInput.value = 'nuevo'; usernameInput.dispatchEvent(new Event('input'));
        cityInput.value = 'Barcelona'; cityInput.dispatchEvent(new Event('input'));
        companyInput.value = 'NuevaEmpresa'; companyInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // Enviar formulario
        const form = fixture.debugElement.query(By.css('form')).nativeElement;
        form.dispatchEvent(new Event('submit'));
        tick();
        fixture.detectChanges();

        // Validaciones
        expect(userServiceMock.createUser).toHaveBeenCalled();
        const userCards = fixture.debugElement.queryAll(By.css('.user-card'));
        expect(userCards.length).toBe(1);
        expect(userCards[0].nativeElement.textContent).toContain('Nuevo Usuario');
    }));

    it('debería mostrar error si falla la creación de usuario', fakeAsync(() => {
        userServiceMock.createUser.and.returnValue(throwError(() => new Error('Error al crear usuario')));

        fixture.detectChanges();

        const newBtn = fixture.debugElement.queryAll(By.css('.btn-primary'))[1].nativeElement;
        newBtn.click();
        fixture.detectChanges();

        // Rellenar campos mínimos válidos
        const nameInput = fixture.debugElement.query(By.css('[formControlName="name"]')).nativeElement;
        nameInput.value = 'Usuario Error';
        nameInput.dispatchEvent(new Event('input'));

        const emailInput = fixture.debugElement.query(By.css('[formControlName="email"]')).nativeElement;
        emailInput.value = 'error@test.com';
        emailInput.dispatchEvent(new Event('input'));

        const usernameInput = fixture.debugElement.query(By.css('[formControlName="username"]')).nativeElement;
        usernameInput.value = 'error';
        usernameInput.dispatchEvent(new Event('input'));

        const cityInput = fixture.debugElement.query(By.css('[formControlName="city"]')).nativeElement;
        cityInput.value = 'Madrid';
        cityInput.dispatchEvent(new Event('input'));

        const companyInput = fixture.debugElement.query(By.css('[formControlName="company"]')).nativeElement;
        companyInput.value = 'ErrorCorp';
        companyInput.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        const form = fixture.debugElement.query(By.css('form')).nativeElement;
        form.dispatchEvent(new Event('submit'));
        tick();
        fixture.detectChanges();

        const errorEl = fixture.debugElement.query(By.css('.error'));
        expect(errorEl).toBeTruthy();
        expect(errorEl.nativeElement.textContent).toContain('Error al crear usuario');
    }));

    it('debería mostrar errores si el formulario está vacío', fakeAsync(() => {
        userServiceMock.getAllUsers.and.returnValue(of([]));
        fixture.detectChanges();

        component.newUser();
        fixture.detectChanges();

        // 🔹 Marca todos los campos como touched
        component.userForm.markAllAsTouched();
        fixture.detectChanges();

        const form = fixture.debugElement.query(By.css('form')).nativeElement;
        form.dispatchEvent(new Event('submit'));
        tick();
        fixture.detectChanges();

        const errors = fixture.debugElement.queryAll(By.css('.error'));
        expect(errors.length).toBe(5); // 5 campos obligatorios
    }));


    it('debería deshabilitar botón de submit si formulario inválido', fakeAsync(() => {
        userServiceMock.getAllUsers.and.returnValue(of([]));
        fixture.detectChanges();

        component.newUser();
        fixture.detectChanges();

        const submitBtn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
        expect(submitBtn.disabled).toBeTrue();
    }));

    it('debería habilitar botón de submit si formulario válido', fakeAsync(() => {
        userServiceMock.getAllUsers.and.returnValue(of([]));
        fixture.detectChanges();

        component.newUser();
        fixture.detectChanges();

        component.userForm.setValue({
            name: 'Javi',
            email: 'javi@test.com',
            username: 'javi123',
            city: 'Madrid',
            company: 'EmpresaX'
        });
        fixture.detectChanges();

        const submitBtn = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
        expect(submitBtn.disabled).toBeFalse();
    }));


});
