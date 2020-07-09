import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WebserviceModel} from '../Models/webservice.model';
import {createRequestOption} from '../../shared/utils/request-util';


@Injectable({ providedIn: 'root' })
export class webService {

    constructor(private http: HttpClient) {}

    createWebService(webservice: WebserviceModel): Observable<HttpResponse<WebserviceModel>> {
        return this.http.post<WebserviceModel>('api/api/webservices', webservice, {observe: 'response', headers: authorization.headers});
    }

    updateWebService(webservice: WebserviceModel): Observable<HttpResponse<WebserviceModel>> {
        return this.http.put<WebserviceModel>('api/api/webservices', webservice, {observe: 'response', headers: authorization.headers});
    }

    getWebServices(req: any): Observable<WebserviceModel[]> {
        const options = createRequestOption(req);
        return this.http.get<WebserviceModel[]>('/api/api/webservices', {params: options, headers: authorization.headers});
    }

    deleteWebService(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${'/api/api/webservices'}/${id}`, {observe: 'response', headers: authorization.headers});
    }

    testConnection(id: string){
        return this.http.get(`/api/api/${id}/test`, {observe: 'response',responseType:'text',headers: authorization.headers});
    }

    checkConnection(webservice: WebserviceModel):Observable<HttpResponse<any>> {
        return this.http.post<WebserviceModel>('/api/wsx/api/test', webservice, {observe: 'response', headers: authorization.headers});
    }
}

export class authorization {
    public static headers = {"Authorization": 'Bearer ' + localStorage.getItem('token')}
}
