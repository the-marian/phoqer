import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

import {
    Translations,
    TranslationsPageService,
} from '../translations-page.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
    displayedColumns: string[] = ['id', 'content', 'delete'];
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public dialog: MatDialog,
        public trans: TranslationsPageService
    ) {}

    ngAfterViewInit() {
        this.trans.data.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.trans.data.filter = filterValue.trim().toLowerCase();
    }

    open(data: Translations): void {
        const dialogRef = this.dialog.open(EditModalComponent, {
            maxWidth: '70rem',
            width: '100%',
            data,
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) this.trans.updateContent(result);
        });
    }
    deleteModal(data: Translations): void {
        const dialogRef = this.dialog.open(DeleteModalComponent, {
            maxWidth: '50rem',
            width: '100%',
            data,
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) this.trans.deleteContent(result);
        });
    }
}
