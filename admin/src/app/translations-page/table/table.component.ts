import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
    id: string;
    text: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { text: 'Hydrogen', id: 'H' },
    { text: 'Helium', id: 'He' },
    { text: 'Lithium', id: 'Li' },
    { text: 'Beryllium', id: 'Be' },
    { text: 'Boron', id: 'B' },
    { text: 'Carbon', id: 'C' },
    { text: 'Nitrogen', id: 'N' },
    { text: 'Oxygen', id: 'O' },
    { text: 'Fluorine', id: 'F' },
    { text: 'Neon', id: 'Ne' },
];

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    displayedColumns: string[] = ['id', 'text'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    open(): void {
        console.log('dssdds');
    }
}
