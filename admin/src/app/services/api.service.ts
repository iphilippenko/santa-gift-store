import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpHeaders, HttpResponseBase} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor() {
    }

    public getUrl(url: string): string {
        return `${environment.baseUrl}${url}`;
    }

    getHeaders(customHeaders?) {
        let data = {};
        if (customHeaders) {
            data = customHeaders;
        } else {
            data['Content-Type'] = 'application/json';
        }
        data['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
        data['Access-Control-Expose-Headers'] = 'token-refresh';
        data['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-header, token-refresh';
        const headers = new HttpHeaders(data);

        return {headers: headers};
    }

    handleError(error: HttpResponseBase | any): Observable<any> {
        let errMsg: string;
        if (error instanceof HttpResponseBase) {
            let body: any = error['error'];
            switch (error.status) {
                case 0:
                case 401:
                    break;
                case 403:
                    break;
                case 404:
                    break;
                case 400:
                    break;
                case 405:
                    break;
                case 409:
                    break;
                case 402:
                    break;
                case 500:
                    break;
                case 422:
                    break;
                default:
                    break;
            }
            const err = body.errorCode || JSON.stringify(body);
            errMsg = body.message ? body.message : error.toString();
        } else {
            errMsg = error.error.message ? error.error.message : error.toString();
        }
        return throwError(errMsg);
    }

}
