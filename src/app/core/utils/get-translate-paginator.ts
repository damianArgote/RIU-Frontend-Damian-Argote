import { MatPaginatorIntl } from "@angular/material/paginator";


export const getTranslatePaginator = (): MatPaginatorIntl  => {
    const translate = new MatPaginatorIntl();

    translate.itemsPerPageLabel = 'Items por página';
    translate.nextPageLabel = 'Siguiente página';
    translate.previousPageLabel = 'Página anterior';
    translate.firstPageLabel = 'Primera página';
    translate.lastPageLabel = 'Última página';

    translate.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} – ${endIndex} de ${length}`;
  };

  return translate;
}