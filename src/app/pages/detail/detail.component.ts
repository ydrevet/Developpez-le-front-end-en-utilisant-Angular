import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, take } from 'rxjs';
import { Olympic } from '../../core/models/Olympic';
import { Participation } from '../../core/models/Participation';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  protected countryName!: string;
  private olympics$!: Observable<Olympic[]>;
  protected olympicCountry!: Olympic[];
  protected participations!: Participation[];
  protected participationsCount!: number;
  protected medalsCount!: number;
  protected athletesCount!: number;
  protected lineChartData!: { series: { name: number; value: number }[]; name: string }[];

  constructor(private activatedRoute: ActivatedRoute, private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.activatedRoute.params.pipe(
      take(1),
      map(params => params['country'])
    ).subscribe((countryName) => this.countryName = countryName);
    this.olympics$.pipe(
      take(1),
      map((olympics) => {
          return olympics.filter((o) => o.country === this.countryName);
        }
      )
    ).subscribe((olympics: Olympic[]) => {
      this.olympicCountry = olympics;
      if (olympics.length === 1) {
        this.participations = olympics[0].participations;
        this.participationsCount = this.participations.length;
        this.medalsCount = this.participations
          .map(p => p.medalsCount)
          .reduce((acc, cur) => acc + cur);
        this.athletesCount = this.participations
          .map(p => p.athleteCount)
          .reduce((acc, cur) => acc + cur);
        const lineChartSeries = this.participations.map((p) => {
          return {
            value: p.medalsCount,
            name: p.year
          }
        });
        this.lineChartData = [
          {
            name: this.countryName,
            series: lineChartSeries,
          }
        ];
      }
    });
  }
}
