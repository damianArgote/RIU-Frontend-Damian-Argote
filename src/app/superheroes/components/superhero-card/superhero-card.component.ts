import { Component, input } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { Superhero } from '../../../core/models/superheroe.model';

@Component({
  selector: 'app-superhero-card',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './superhero-card.component.html',
  styleUrl: './superhero-card.component.scss'
})
export class SuperheroCardComponent {
  public hero = input<Superhero>();
}
