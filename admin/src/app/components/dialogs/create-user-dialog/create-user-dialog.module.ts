import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateUserDialogComponent} from './create-user-dialog.component';
import {
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    declarations: [
        CreateUserDialogComponent
    ],
    entryComponents: [
        CreateUserDialogComponent
    ],
    exports: [
        CreateUserDialogComponent,
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDatepickerModule,
        FlexLayoutModule,
        ReactiveFormsModule
    ]
})
export class CreateUserDialogModule {
}
