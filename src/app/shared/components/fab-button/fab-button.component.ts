import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fab-button',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './fab-button.component.html',
  styleUrl: './fab-button.component.scss'
})
export class FabButtonComponent {
  private router = inject(Router);

  goToNew() {
    this.router.navigate(['/superheroes/new']);
  }
}
