import {
    AfterContentInit,
    AfterViewInit,
    Component,
    Input,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

import {
    Translations,
    TranslationsPageService,
} from '../translations-page.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
    displayedColumns: string[] = ['delete', 'id', 'content'];
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public dialog: MatDialog,
        public trans: TranslationsPageService,
        private routerParams: ActivatedRoute
    ) {}

    ngAfterViewInit() {
        this.routerParams.params.subscribe(() => {
            this.trans.data.sort = this.sort;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.trans.data.filter = filterValue.trim().toLowerCase();
    }

    open(data: Translations): void {
        this.dialog.open(EditModalComponent, {
            maxWidth: '70rem',
            width: '100%',
            data,
        });
    }

    deleteModal(data: Translations): void {
        this.dialog.open(DeleteModalComponent, {
            maxWidth: '50rem',
            width: '100%',
            data,
        });
    }
}
