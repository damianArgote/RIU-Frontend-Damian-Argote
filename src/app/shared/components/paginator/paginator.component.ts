import { Component, input, output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginator],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  length = input<number>(0)
  pageSize = input<number>(5)
  pageSizeOptions = input<number[]>([5, 10, 20])

  pageChange = output<PageEvent>();

  ngAfterViewInit() {
    this.pageChange.emit({
      pageIndex: 0,
      pageSize: this.pageSize(),
      length: this.length()
    });
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

}
