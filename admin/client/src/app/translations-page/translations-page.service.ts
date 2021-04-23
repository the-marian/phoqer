import { Injectable, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

type Links = 'en' | 'pl' | 'ru';
export interface Translations {
    id: string;
    content: string;
}

@Injectable({
    providedIn: 'root',
})
export class TranslationsPageService implements OnInit {
    baseUrl = 'http://localhost:4201/api/translations/';
    language: Links = 'en';
    data: MatTableDataSource<Translations>;

    constructor(private routes: ActivatedRoute, private http: HttpClient) {}

    ngOnInit(): void {
        this.routes.params.subscribe((params: Params) => {
            this.language = params.language;
        });
    }

    getContent(lang: Links): void {
        this.http.get<Translations>(this.baseUrl + lang).subscribe((res) => {
            this.data = new MatTableDataSource<Translations>(
                res
                    ? Object.entries(res).map<Translations>((item) => ({
                          id: item[0],
                          content: item[1],
                      }))
                    : []
            );
        });
    }

    updateContent(value: Translations): void {
        this.http
            .put<Translations>(this.baseUrl + this.language, value)
            .subscribe((res) => {
                console.log(res);
            });
    }

    addContent(value: Translations): void {
        this.http
            .post<Translations>(this.baseUrl + this.language, value)
            .subscribe((res) => {
                console.log(res);
            });
    }

    deleteContent(id: string): void {
        this.http.delete<Translations>(this.baseUrl + id).subscribe((res) => {
            console.log(res);
        });
    }
}
