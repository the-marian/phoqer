import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from './shared/material-ui/material-ui.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { ContainerComponent } from './shared/container/container.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TranslationsPageComponent } from './pages/translations-page/translations-page.component';
import { TableComponent } from './pages/translations-page/table/table.component';
import { EditModalComponent } from './pages/translations-page/edit-modal/edit-modal.component';
import { CreateModalComponent } from './pages/translations-page/create-modal/create-modal.component';
import { DeleteModalComponent } from './pages/translations-page/delete-modal/delete-modal.component';
import { ScrollTopComponent } from './shared/scroll-top/scroll-top.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ScrollBottomComponent } from './pages/translations-page/scroll-bottom/scroll-bottom.component';

@NgModule({
    declarations: [
        AppComponent,
        ContainerComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        HomePageComponent,
        TranslationsPageComponent,
        TableComponent,
        EditModalComponent,
        CreateModalComponent,
        DeleteModalComponent,
        ScrollTopComponent,
        ScrollBottomComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        MaterialUiModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        NgxSkeletonLoaderModule,
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
