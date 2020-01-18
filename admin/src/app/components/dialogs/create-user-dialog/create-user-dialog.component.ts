import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {User} from '@interfaces/user.interface';
import {UserService} from '@services/user-services/user.service';
import {Role} from '@interfaces/role.interface';

@Component({
    selector: 'app-create-user-dialog',
    templateUrl: './create-user-dialog.component.html',
    styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent {
    action: string;
    user: User;
    roles: Array<Role> = [];
    userForm: FormGroup;
    dialogTitle: string;
    subscriptions: Array<Subscription> = [];


    constructor(
        public matDialogRef: MatDialogRef<CreateUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private userService: UserService
    ) {
        // Set the defaults
        this.action = _data.action;
        if (this.action === 'edit') {
            this.dialogTitle = 'Update user';
            this.user = _data.user;
        } else {
            this.dialogTitle = 'Create user';
        }
        console.log(this.action);
        this.roles = this.userService.roles;

        this.userForm = this.createContactForm();
        console.log(this.userForm);
    }

    createContactForm(): FormGroup {
        return this._formBuilder.group({
            firstName: [this.getUserProperty('firstName')],
            lastName: [this.getUserProperty('lastName')],
            email: [this.getUserProperty('email'),
                Validators.compose([
                    Validators.required,
                    Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
            password: [this.getUserProperty('password'),
                [Validators.minLength(6)]],
            role: [this.getUserProperty('role') ? this.getUserProperty('role')._id : null,
                Validators.required],
            phone: [this.getUserProperty('phone'), Validators.pattern(/^\+?3?8?(0\d{9})$/)]
        });
    }

    getUserProperty(field) {
        return this.user ? this.user[field] || null : null;
    }

    async saveUser(): Promise<void> {
        return this.matDialogRef.close(this.userForm.value);
    }

    get email(): AbstractControl {
        return this.userForm.get('email');
    }

    get phone(): AbstractControl {
        return this.userForm.get('phone');
    }

    get password(): AbstractControl {
        return this.userForm.get('password');
    }

}



