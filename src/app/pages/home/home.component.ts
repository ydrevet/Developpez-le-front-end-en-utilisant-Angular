import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  protected olympics$: Observable<Olympic[]> = of();
  protected pieChartData$: Observable<Object[]> = of();
  protected medalIcon = faMedal;
  protected numberOfOlympics$: Observable<number> = of();
  protected numberOfCountries$: Observable<number> = of();

  constructor(private olympicService: OlympicService, private router: Router) {
  }

  private static formatPieChart(value: Olympic[]): { name: string, value: number }[] {
    return value.map((olympic) => {
      return {
        name: olympic.country,
        value: olympic.participations.reduce((acc, cur) => {
          return acc + cur.medalsCount;
        }, 0),
      }
    })
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.pieChartData$ = this.olympics$.pipe(
      map(HomeComponent.formatPieChart)
    );

    this.numberOfOlympics$ = this.olympics$.pipe(
      map((olympics) => {
        const participations = olympics.flatMap((o) => o.participations);
        const cities = participations.map((p) => p.city);
        const uniqueCities = new Set(cities);
        return uniqueCities.size;
      })
    );

    this.numberOfCountries$ = this.olympics$.pipe(
      map((olympics) => olympics.length)
    );
  }

  onPieChartSelected($event: any) {
    this.router.navigate(['/details', $event.name]);
  }
}
