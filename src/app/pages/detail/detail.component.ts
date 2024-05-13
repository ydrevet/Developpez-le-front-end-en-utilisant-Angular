import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, take } from 'rxjs';
import { Olympic } from '../../core/models/Olympic';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  protected countryName!: string;
  private olympics$!: Observable<Olympic[]>;
  protected olympicCountry!: Olympic[];

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
    ).subscribe((olympics: Olympic[]) => {this.olympicCountry = olympics});
  }
}
