export interface IParams {
     dbName?: string,
       dbType?: string,
      dbDriver?: string,
      dbProtocol?: string,
     dbIp?: string,
      dbPort?: string,
     dbLogin?: string,
     dbPassword?: string
}

export class Params implements IParams{
    constructor(
        public dbName?: string,
        public   dbType?: string,
        public  dbDriver?: string,
        public  dbProtocol?: string,
        public dbIp?: string,
        public  dbPort?: string,
        public dbLogin?: string,
        public dbPassword?: string
        ) {
        this.dbName = dbName ? dbName : "";
        this.dbType = dbType ? dbType : "";
        this.dbDriver = dbDriver ? dbDriver : "";
        this.dbProtocol = dbProtocol ? dbProtocol : "";
        this.dbIp = dbIp ? dbIp : "";
        this.dbPort = dbPort ? dbPort : "";
        this.dbLogin = dbLogin ? dbLogin : "";
        this.dbPassword = dbPassword ? dbPassword : "";
    }
}
