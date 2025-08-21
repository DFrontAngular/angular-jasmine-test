// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User, UserService } from '../../services/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-list.html',
  styleUrl: './app-list.scss'
    
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
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
      }
    });
  }

  loadSpecificUser(id: number) {
    this.loading = true;
    this.error = null;
    
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.users = [user];
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        this.users = [];
      }
    });
  }

  updateUser(id: number) {
    const updateData = {
      name: `Usuario Actualizado ${id}`,
      email: `updated${id}@example.com`
    };

    this.userService.updateUser(id, updateData).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
        },
        error: (error) => {
          this.error = error.message;
        }
      });
    }
  }

  clearError() {
    this.error = null;
  }
}