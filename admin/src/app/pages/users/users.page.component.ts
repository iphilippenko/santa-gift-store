import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '@services/user-services/user.service';
import {Subscription} from 'rxjs';
import {TableHeader} from '@interfaces/table.interface';
import {User} from '@interfaces/user.interface';
import {ConfirmDialogsService} from '@services/dialogs-services/confirm-dialogs.service';
import {CreateUserDialogComponent} from '@components/dialogs/create-user-dialog/create-user-dialog.component';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SidenavService} from '@services/sidenav-services/sidenav.service';
import {ProgressBarService} from '@services/progress-bar.service';
import {FileUploadService} from '@services/file-upload-services/file-upload.service';

@Component({
    selector: 'app-users.page',
    templateUrl: './users.page.component.html',
    styleUrls: ['./users.page.component.scss']
})
export class UsersPage implements OnInit, OnDestroy {
    dialogRef;
    users: Array<User> = [];
    subscriptions: Array<Subscription> = [];
    actionButtons = ['edit', 'delete'];
    tableHeaders: Array<TableHeader> = [
        {
            selector: 'firstName',
            name: 'First name'
        },
        {
            selector: 'lastName',
            name: 'Last name'
        },
        {
            selector: 'email',
            name: 'Email'
        },
        {
            selector: 'phone',
            name: 'Phone'
        },
        {
            selector: 'role.name',
            name: 'Role'
        },
        {
            selector: 'actions',
            name: 'Actions'
        }];
    @ViewChild('csvInput', {static: false}) csvInput;

    constructor(
        private matDialog: MatDialog,
        private userService: UserService,
        private confirmDialog: ConfirmDialogsService,
        public progressBarService: ProgressBarService,
        private fileService: FileUploadService,
        private _snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.getUsers();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    getUsers(): void {
        this.progressBarService.show();
        this.subscriptions.push(
            this.userService.getAllUsers().subscribe(
                data => {
                    this.progressBarService.hide();
                    console.log(data);
                    this.users = data;
                }, err => {
                    this.progressBarService.hide();
                    console.error(err);
                }
            )
        );
    }

    updateUser(user?) {
        console.log(user);
        let dialogData: {
            userRoles: boolean;
            action: string;
            user?: User;
        } = {
            userRoles: true,
            action: 'new'
        };
        if (typeof user !== 'undefined') {
            dialogData.user = user;
            dialogData.action = 'edit';
        }
        this.dialogRef = this.matDialog.open(CreateUserDialogComponent, {
            panelClass: 'contact-form-dialog',
            data: dialogData
        });

        this.subscriptions.push(
            this.dialogRef.afterClosed().subscribe((response: User) => {
                if (response) {
                    this.progressBarService.show();
                    console.log(response);
                    this.saveUser(response, user ? user._id : undefined);
                }
            })
        );
    }


    saveUser(user: User, id?: string) {
        this.subscriptions.push(
            (id ? this.userService.updateUser(id, user)
                : this.userService.createUser(user))
                .subscribe(
                    data => {
                        this.progressBarService.hide();
                        this.getUsers();
                    },
                    err => {
                        this.progressBarService.hide();
                    }
                )
        );
    }

    deleteUser(id) {
        this.subscriptions.push(
            this.confirmDialog.deleteConfirmDialog('Are you sure you want to delete this user?',
                ['Cancel', 'Delete'])
                .subscribe(
                    res => {
                        if (res === 'Delete') {
                            this.subscriptions.push(
                                this.userService.deleteUser(id).subscribe(
                                    res => {
                                        this.getUsers();
                                    }, err => {
                                    })
                            );
                        }
                    }
                )
        );
    }

    processFile(): void {
        const fileElem = this.csvInput.nativeElement;

        if (fileElem.files && fileElem.files.length) {
            this.progressBarService.show();
            const formData = new FormData();
            formData.append('file', fileElem.files[fileElem.files.length - 1]);
            this.subscriptions.push(
                this.fileService.csvFileUpload(formData).subscribe(
                    data => {
                        this.csvInput.nativeElement.value = '';
                        this.getUsers();
                        this._snackBar.open('Success', null, {duration: 2000});
                    }, err => {
                        this._snackBar.open(err, null, {duration: 5000});
                        this.progressBarService.hide();
                    })
            );
        }
    }
    getFile(): void {
        this.csvInput.nativeElement.click();
    }

}
