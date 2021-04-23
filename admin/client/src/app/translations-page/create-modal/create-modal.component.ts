import { Component } from '@angular/core';
import { TranslationsPageService } from '../translations-page.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-create-modal',
    templateUrl: './create-modal.component.html',
    styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent {
    id = '';
    content = '';
    constructor(
        private trans: TranslationsPageService,
        public dialogRef: MatDialogRef<CreateModalComponent>,
        private notif: MatSnackBar
    ) {}

    create(): void {
        if (!this.id.trim() || !this.content.trim()) {
            this.notif.open('Fill in all the fields', 'ok', {
                duration: 2500,
            });
            return;
        }

        if (this.trans.data.data.find((item) => item.id === this.id)) {
            this.notif.open(
                `Id: "${this.id}" is already exists! Please change the id value.`,
                'ok',
                {
                    duration: 3000,
                }
            );
            return;
        }

        if (
            this.trans.data.data.find((item) => item.content === this.content)
        ) {
            this.notif.open(
                `Content: "${this.content}" is already exists! Do not duplicate values.`,
                'ok',
                {
                    duration: 3000,
                }
            );
            return;
        }

        this.trans
            .addContent({ id: this.id, content: this.content })
            .subscribe((res) => {
                this.trans.data.data = [
                    ...this.trans.data.data,
                    {
                        id: this.id,
                        content: this.content,
                    },
                ];
                this.dialogRef.close();
                this.notif.open(
                    "The new content was successfully CREATED. Fields have been added into all tables. Don't forget to add translations there",
                    'ok',
                    {
                        duration: 4500,
                    }
                );
            });
    }
}
