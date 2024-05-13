import { Component, OnInit } from '@angular/core';
import { OlympicService } from '../../core/services/olympic.service';
import { ActivatedRoute, Params } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private olympicService: OlympicService) {
  }

  protected countryName$!: Observable<string>;

  ngOnInit(): void {
    this.countryName$ = this.activatedRoute.params.pipe(map((params: Params) => params['country']));
  }
}
