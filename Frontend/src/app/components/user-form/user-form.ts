import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  form = {
    firstName: '',
    lastName: '',
    companyId: '',
    companyPosition: ''
  };

  userCreated = output<User>();
  isLoading = signal(false);
  errorMessage = signal('');

  positions = ['Consultant', 'Team manager', 'Product owner', 'Business analyst', 'Student'];

  constructor(private userService: UserService) {}

  isFormValid(): boolean {
    return this.form.firstName.trim() !== '' &&
      this.form.lastName.trim() !== '' &&
      this.form.companyId !== '' &&
      this.form.companyPosition !== '';
  }

  onSubmit() {
    if (!this.isFormValid()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const newUser: User = {
      firstName: this.form.firstName.trim(),
      lastName: this.form.lastName.trim(),
      companyId: parseInt(this.form.companyId),
      companyPosition: this.form.companyPosition
    };

    this.userService.createUser(newUser).subscribe({
      next: (user) => {
        this.userService.notifyUserCreated(user);
        this.resetForm();
        this.isLoading.set(false);
      },
      error: (error: any) => {
        this.errorMessage.set(error.error?.message || 'Erreur lors de la création de l\'utilisateur');
        this.isLoading.set(false);
      }
    });
  }

  private resetForm() {
    this.form = {
      firstName: '',
      lastName: '',
      companyId: '',
      companyPosition: ''
    };
  }
}
