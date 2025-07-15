import { Component, inject, input } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { Superhero } from '../../../core/models/superheroe.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { SuperheroService } from '../../../core/services/superhero.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-superhero-card',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './superhero-card.component.html',
  styleUrl: './superhero-card.component.scss'
})
export class SuperheroCardComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog)
  private superheroService = inject(SuperheroService)
  private toast = inject(ToastrService)
  public hero = input<Superhero>();


  goToEdit(id:string) {
    this.router.navigate([`/superheroes/edit/${id}`]);
  }

  openConfirmDialog(hero: Superhero){
    this.dialog
    .open(ConfirmDialogComponent,{
      data:{
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de eliminar a ${hero.name}?`
      }
    })
    .afterClosed()
    .subscribe((confirmed: boolean) => {

      if(confirmed){
        try {
          this.superheroService.delete(hero.id!);
          this.toast.success(`Se ha eliminado a ${hero.name}`);
        } catch (error) {
          this.toast.error(`Error al eliminar a ${hero.name}: ${error}`);
        }
      }
    })
  }
}
