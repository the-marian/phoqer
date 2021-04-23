import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
    Translations,
    TranslationsPageService,
} from '../translations-page.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
    content = '';
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Translations,
        private trans: TranslationsPageService,
        public dialogRef: MatDialogRef<EditModalComponent>,
        private notif: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.content = this.data.content;
    }

    save(id: string) {
        if (!this.content.trim()) {
            this.notif.open('Fill in the content', 'ok', {
                duration: 2500,
            });
            return;
        }

        this.trans
            .updateContent({ id, content: this.content })
            .subscribe((res) => {
                this.trans.data.data = this.trans.data.data.map<Translations>(
                    (item) =>
                        item.id === id ? { id, content: this.content } : item
                );
                this.dialogRef.close();
                this.notif.open('The content was successfully UPDATED', 'ok', {
                    duration: 2500,
                });
            });
    }
}
