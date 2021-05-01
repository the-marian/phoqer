import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    Translations,
    TranslationsPageService,
} from '../translations-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Translations,
        public trans: TranslationsPageService,
        public dialogRef: MatDialogRef<DeleteModalComponent>,
        private notif: MatSnackBar
    ) {}

    deleteContent(id: string): void {
        this.trans.deleteContent(id).subscribe(() => {
            this.trans.data.data = this.trans.data.data.filter(
                (item) => item.id !== id
            );
            this.dialogRef.close();
            this.notif.open('The content was successfully DELETED', 'ok', {
                duration: 2500,
            });
        });
    }
}
