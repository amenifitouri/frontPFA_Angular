import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { FormsModule }   from '@angular/forms';
import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
FullCalendarModule.registerPlugins([
    dayGridPlugin,
    interactionPlugin
  ]);

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        
    FullCalendarModule,
   
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
    ],
    providers: [],
})
export class DashboardModule { }
