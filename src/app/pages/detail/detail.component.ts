import { Component, OnDestroy, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Olympic } from '../../core/models/Olympic';
import { Participation } from '../../core/models/Participation';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {

  protected countryName!: string;
  protected olympicCountry!: Olympic[];
  protected participations!: Participation[];
  protected participationsCount!: number;
  protected medalsCount!: number;
  protected athletesCount!: number;
  protected lineChartData!: { series: { name: string; value: number }[]; name: string }[];
  private olympics$!: Observable<Olympic[]>;
  private destroyerSubject$: Subject<void> = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private olympicService: OlympicService) {
  }

  ngOnDestroy(): void {
    this.destroyerSubject$.next();
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.activatedRoute.params.pipe(
      takeUntil(this.destroyerSubject$),
      map(params => params['country'])
    ).subscribe((countryName) => this.countryName = countryName);

    this.olympics$.pipe(
      takeUntil(this.destroyerSubject$),
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
            name: p.year.toString()
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
