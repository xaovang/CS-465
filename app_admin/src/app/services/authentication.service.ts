import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  // Retrieve the token from local storage
  public getToken(): string {
    return this.storage.getItem('travlr-token') || ''; // Handle null case
  }

  // Save the token to local storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // User login method
  public login(user: User): Promise<void> {
    return this.tripDataService
      .login(user)
      .then((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
      })
      .catch((err) => {
        console.error('Login failed:', err);
        throw new Error('Unable to login. Please check your credentials.');
      });
  }

  // User registration method
  public register(user: User): Promise<void> {
    return this.tripDataService
      .register(user)
      .then((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
      })
      .catch((err) => {
        console.error('Registration failed:', err);
        throw new Error('Unable to register. Please try again.');
      });
  }

  // Logout method to remove the token
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Check if user is logged in
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    try {
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      }
    } catch (e) {
      console.error('Invalid token:', e);
      this.logout(); // Remove invalid tokens
    }
    return false;
  }

  // Get the current user data
  public getCurrentUser(): User | undefined {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      try {
        const { email, name } = JSON.parse(atob(token.split('.')[1]));
        return { email, name } as User;
      } catch (e) {
        console.error('Failed to parse user token:', e);
      }
    }
    return undefined;
  }
}
