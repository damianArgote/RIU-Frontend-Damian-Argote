import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';


describe('ConfirmDialogComponent',() => {
    let fixture: ComponentFixture<ConfirmDialogComponent>;
    let component: ConfirmDialogComponent;

    const dialogRefMock = {
        close: jasmine.createSpy('close')
    };

    const dialogData = {
        title: 'Confirmar eliminación',
        message: '¿Estás seguro de eliminar?'
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConfirmDialogComponent],
            providers: [
                { provide: MatDialogRef, useValue: dialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: dialogData }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render title and message from data',() =>{
        const titleEl = fixture.debugElement.query(By.css('h2')).nativeElement;
        const messageEl = fixture.debugElement.query(By.css('mat-dialog-content p')).nativeElement;

        expect(titleEl.textContent).toBe(dialogData.title);
        expect(messageEl.textContent).toBe(dialogData.message);
    });

    it('should close dialog with false when cancel is called', () => {
        component.cancel();
        expect(dialogRefMock.close).toHaveBeenCalledWith(false);
    });

    it('should close dialog with true when confirmDelete is called', () => {
        component.confirmDelete();
        expect(dialogRefMock.close).toHaveBeenCalledWith(true);
    });

    it('should close dialog with false when clicking Cancelar button', () => {
        const cancelButton = fixture.debugElement.queryAll(By.css('button'))[0];
        cancelButton.nativeElement.click();
        expect(dialogRefMock.close).toHaveBeenCalledWith(false);
    });

    it('should close dialog with true when clicking Confirmar button', () => {
        const confirmButton = fixture.debugElement.queryAll(By.css('button'))[1];
        confirmButton.nativeElement.click();
        expect(dialogRefMock.close).toHaveBeenCalledWith(true);
    });
})