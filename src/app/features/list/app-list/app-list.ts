// user-list.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { User, UserService } from '../../../core/services/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app-list.html',
  styleUrls: ['./app-list.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  userForm!: UntypedFormGroup; 

  // controlamos si el formulario está visible
  showForm = signal(false);

  

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', Validators.required],
      company: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  protected loadUsers() {
    this.loading = true;
    this.error = null;

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        this.users = [];
      },
    });
  }

  protected updateUser(id: number) {
    const updateData = {
      name: `Usuario Actualizado ${id}`,
      email: `updated${id}@example.com`,
    };

    this.userService.updateUser(id, updateData).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex((u) => u.id === id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  protected deleteUser(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((u) => u.id !== id);
        },
        error: (error) => {
          this.error = error.message;
        },
      });
    }
  }

  protected clearError() {
    this.error = null;
  }

  newUser() {
    this.showForm.set(true);
  }

 submitUser() {
  if (this.userForm.invalid) return;

  const { name, email, username, city, company } = this.userForm.value;

  const newUser: User = {
    id: Date.now(),
    name: name!,
    username: username!,
    email: email!,
    phone: '', // valores vacíos si no se recogen
    website: '',
    address: {
      street: '',
      suite: '',
      city: city!,
      zipcode: '',
      geo: { lat: '0', lng: '0' }
    },
    company: {
      name: company!,
      catchPhrase: '',
      bs: ''
    }
  };

  this.userService.createUser(newUser).subscribe({
    next: (createdUser) => {
      this.users = [...this.users, createdUser];
      this.userForm.reset();
      this.showForm.set(false);
    },
    error: (error) => {
      this.error = error.message;
    }
  });
}

}
