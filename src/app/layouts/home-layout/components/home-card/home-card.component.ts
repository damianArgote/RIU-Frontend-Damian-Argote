import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../../shared/modules/material.module';

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.scss'
})
export class HomeCardComponent {

  @Input({ required: true }) title!: string;
  @Input() image?: string;
}
