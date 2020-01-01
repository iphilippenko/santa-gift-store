import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../api.service';
import {catchError, first, map} from 'rxjs/operators';
import {User} from '../../interfaces/user.interface';
import {Role} from '../../interfaces/role.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public roles: Array<Role> = [];

    constructor(private http: HttpClient,
                private api: ApiService) {
    }

    public createUser(user: User): Observable<User> {
        return this.http
            .post(this.api.getUrl('users'), user, this.api.getHeaders())
            .pipe(map((res: User) => res))
            .pipe(catchError((error: Response) => this.api.handleError(error)));
    }

    public getUser(id): Observable<User> {
        return this.http
            .get(this.api.getUrl('users/' + id), this.api.getHeaders())
            .pipe(map((res: User) => res))
            .pipe(catchError((error: Response) => this.api.handleError(error)));
    }

    public updateUser(id, user: User): Observable<User> {
        return this.http
            .put(this.api.getUrl('users/' + id), user, this.api.getHeaders())
            .pipe(map((res: User) => res))
            .pipe(catchError((error: Response) => this.api.handleError(error)));
    }

    public deleteUser(id): Observable<User> {
        return this.http
            .delete(this.api.getUrl('users/' + id), this.api.getHeaders())
            .pipe(map((res: User) => res))
            .pipe(catchError((error: Response) => this.api.handleError(error)));
    }

    public getAllUsers(): Observable<Array<User>> {
        return this.http
            .get(this.api.getUrl('users'), this.api.getHeaders())
            .pipe(map((res: Array<User>) => res))
            .pipe(catchError((error: Response) => this.api.handleError(error)));
    }

    public getRole(id): Observable<Role> {
        return this.http
            .get(this.api.getUrl('roles/' + id), this.api.getHeaders())
            .pipe(map((res: Role) => res))
            .pipe(catchError((error: Response) => this.api.handleError(error)));
    }

    public getAllRoles(): Promise<Array<Role>> {
        return new Promise(resolve => {
            this.http
                .get(this.api.getUrl('roles'), this.api.getHeaders())
                .pipe(first())
                .subscribe((roles : Array<Role>) => {
                    this.roles = roles;
                    resolve(roles);
                })
        });
    }
}
