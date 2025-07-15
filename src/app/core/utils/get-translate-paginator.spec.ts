import { getTranslatePaginator } from './get-translate-paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';

describe('getTranslatePaginator', () => {
  let paginator: MatPaginatorIntl;

  beforeEach(() => {
    paginator = getTranslatePaginator();
  });

  it('should return an instance of MatPaginatorIntl', () => {
    expect(paginator).toBeInstanceOf(MatPaginatorIntl);
  });

  it('should set custom labels in Spanish', () => {
    expect(paginator.itemsPerPageLabel).toBe('Items por página');
    expect(paginator.nextPageLabel).toBe('Siguiente página');
    expect(paginator.previousPageLabel).toBe('Página anterior');
    expect(paginator.firstPageLabel).toBe('Primera página');
    expect(paginator.lastPageLabel).toBe('Última página');
  });

  it('should return "0 de X" when length or pageSize is 0', () => {
    expect(paginator.getRangeLabel(0, 0, 10)).toBe('0 de 10');
    expect(paginator.getRangeLabel(0, 5, 0)).toBe('0 de 0');
  });

  it('should return correct range label for valid input', () => {
    expect(paginator.getRangeLabel(0, 10, 50)).toBe('1 – 10 de 50');
    expect(paginator.getRangeLabel(2, 10, 25)).toBe('21 – 25 de 25');
    expect(paginator.getRangeLabel(1, 5, 12)).toBe('6 – 10 de 12');
  });
});