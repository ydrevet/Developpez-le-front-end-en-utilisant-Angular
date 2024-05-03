import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of();
  public pieChartData$: Observable<Object[]> = of();
  medalIcon = faMedal;

  constructor(private olympicService: OlympicService) {
  }

  private static formatPieChart(value: Olympic[]): { name: string, value: number }[] {
    return value.map((olympic) => {
      return {
        name: olympic.country,
        value: olympic.participations.reduce((acc, cur) => {
          return acc + cur.medalsCount
        }, 0),
      }
    })
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.pieChartData$ = this.olympics$.pipe(
      map(HomeComponent.formatPieChart)
    );
  }
}
