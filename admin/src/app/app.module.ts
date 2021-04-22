import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from './material-ui/material-ui.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { ContainerComponent } from './shared/container/container.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TranslationsPageComponent } from './translations-page/translations-page.component';
import { TableComponent } from './translations-page/table/table.component';
import { EditModalComponent } from './translations-page/edit-modal/edit-modal.component';
import { CreateModalComponent } from './translations-page/create-modal/create-modal.component';

@NgModule({
    declarations: [AppComponent, ContainerComponent, HeaderComponent, FooterComponent, SidebarComponent, HomePageComponent, TranslationsPageComponent, TableComponent, EditModalComponent, CreateModalComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        MaterialUiModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'fill' },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
