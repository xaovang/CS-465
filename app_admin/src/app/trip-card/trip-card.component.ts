import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service'; // Import AuthenticationService
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip!: Trip; // Accepts the 'trip' data from the parent component

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService // Inject AuthenticationService
  ) {}

  ngOnInit(): void {}

  // Method to check if user is logged in
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // Method to handle editing a trip
  public editTrip(trip: Trip): void {
    console.log('Edit button clicked for trip:', trip);
    // Optionally navigate to the edit page
    this.router.navigate(['/edit-trip', trip]);
  }
}
