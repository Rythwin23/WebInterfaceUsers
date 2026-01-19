import { Component, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserForm } from './components/user-form/user-form';
import { UserList } from './components/user-list/user-list';
import { User } from './services/user';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, UserForm, UserList],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  newUser = signal<User | null>(null);

  onUserCreated(user: User) {
    this.newUser.set(user);
  }
}
