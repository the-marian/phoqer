import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../table/table.component';

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
    id = '';
    content = '';
    constructor(@Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {}

    ngOnInit(): void {
        this.id = this.data.id;
        this.content = this.data.content;
    }
    changeId(event: Event): void {
        this.id = (event.target as HTMLInputElement).value;
    }
    changeContent(event: Event): void {
        this.content = (event.target as HTMLTextAreaElement).value;
    }
}
