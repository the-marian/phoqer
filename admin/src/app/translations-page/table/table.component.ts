import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

export interface PeriodicElement {
    id: string;
    content: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { content: 'Hydrogen', id: 'H' },
    { content: 'Helium', id: 'He' },
    { content: 'Lithium', id: 'Li' },
    { content: 'Beryllium', id: 'Be' },
    { content: 'Boron', id: 'B' },
    { content: 'Carbon', id: 'C' },
    { content: 'Nitrogen', id: 'N' },
    { content: 'Oxygen', id: 'O' },
    { content: 'Fluorine', id: 'F' },
    { content: 'Neon', id: 'Ne' },
];

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    displayedColumns: string[] = ['id', 'text'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    constructor(public dialog: MatDialog) {}

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    open(data: PeriodicElement): void {
        const dialogRef = this.dialog.open(EditModalComponent, {
            maxWidth: '70rem',
            width: '100%',
            data,
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) console.log(result);
        });
    }
}
