import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  @Input() length = 0;
  @Input() pageSize = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 20];

  @Output() pageChange = new EventEmitter<PageEvent>();

  ngAfterViewInit() {
    this.pageChange.emit({
      pageIndex: 0,
      pageSize: this.pageSize,
      length: this.length
    });
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }

}
