import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-summary-block',
  templateUrl: './summary-block.component.html',
    styleUrl: './summary-block.component.scss'
})
export class SummaryBlockComponent {
  @Input({required: true}) label!: string;
  @Input({required: true, transform: numberAttribute}) value!: number;
}
