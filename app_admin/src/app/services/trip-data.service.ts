import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private url = 'http://localhost:3000/api/trips'; // Adjust for your API endpoint

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  // Add this method to handle saving a new trip
  addTrip(newTrip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, newTrip);
  }
}
