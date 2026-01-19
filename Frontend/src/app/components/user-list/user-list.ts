import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  users = signal<User[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();

    this.userService.userCreated$.subscribe(() => {
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error(error);
        this.errorMessage.set('Erreur lors du chargement des utilisateurs');
        this.isLoading.set(false);
      }
    });
  }

  deleteUser(id: string | undefined): void {
    if (!id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (error: any) => {
          console.error(error);
          this.errorMessage.set('Erreur lors de la suppression');
        }
      });
    }
  }
}
