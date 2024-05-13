import { Component } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  constructor(private olympicService: OlympicService) {
  }
}
