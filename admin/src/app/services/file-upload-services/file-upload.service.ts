import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from '@services/api.service';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    constructor(private api: ApiService, private http: HttpClient) {
    }

    public csvFileUpload(file): Observable<any> {
        return this.http
            .post(this.api.getUrl('upload-csv'), file,  this.api.getHeaders({}))
            .pipe(map((res: string) => res))
            .pipe(catchError((error: Response) => this.api.handleError(error)));
    }
}
