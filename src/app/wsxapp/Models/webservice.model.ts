import {IParams, Params} from './params.model';

export class WebserviceModel {
    constructor(
        public id?: any,
        public login?: string,
        public webserviceName?: string,
        public webserviceDescription?: string,
        public params?: IParams,
        public $$expanded?: boolean
    ) {
        this.id = id ? id : null;
        this.login = login ? login : null;
        this.webserviceName = webserviceName ? webserviceName : null;
        this.webserviceDescription = webserviceDescription ? webserviceDescription : null;
        this.params = new Params();
    }
}
