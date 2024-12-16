import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any; // Accepts the 'trip' data from the parent component

  constructor() {}

  ngOnInit(): void {}
}
