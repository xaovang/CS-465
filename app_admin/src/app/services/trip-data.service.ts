import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { AuthResponse } from '../models/authresponse';
import { User } from '../models/user';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // Existing getTrips method
  getTrips(): Observable<Trip[]> {
    const url = `${this.apiBaseUrl}/trips`;
    return this.http.get<Trip[]>(url);
  }

  // Existing addTrip method
  addTrip(newTrip: Trip): Observable<Trip> {
    const url = `${this.apiBaseUrl}/trips`;
    return this.http.post<Trip>(url, newTrip);
  }

  // New login method
  login(user: User): Promise<AuthResponse> {
    const url = `${this.apiBaseUrl}/login`;
    return this.http
      .post<AuthResponse>(url, user)
      .toPromise()
      .then((response) => response as AuthResponse);
  }

  // New register method
  register(user: User): Promise<AuthResponse> {
    const url = `${this.apiBaseUrl}/register`;
    return this.http
      .post<AuthResponse>(url, user)
      .toPromise()
      .then((response) => response as AuthResponse);
  }
}
