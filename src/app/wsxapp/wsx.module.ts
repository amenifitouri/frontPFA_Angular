import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { WebserviceComponent } from './webservice/webservice.component';
import {wsxRoutingModule} from './wsx-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {SharedModule} from '../shared/shared.module';



@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        MatchHeightModule,
        wsxRoutingModule,
        NgxDatatableModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
    WebserviceComponent
    ],
    providers: [],
})
export class wsxModule { }
