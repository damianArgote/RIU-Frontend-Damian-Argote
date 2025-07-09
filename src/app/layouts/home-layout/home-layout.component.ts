import { Component } from '@angular/core';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [HomeCardComponent,RouterLink],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export class HomeLayoutComponent {

}
