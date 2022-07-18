import { Component,ViewEncapsulation } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";
import * as tableData from '../../shared/data/smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
declare var require: any;
import { Salle } from '../../models/salle.model';
import { SalleService } from '../../service/salle.service';
import { FormControl, Validators, FormGroup } from '@angular/forms'
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from '../../models/event-utils';
const data: any = require('../../shared/data/chartist.json');

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}

@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class Dashboard1Component {
    calendarVisible = true;
    calendarOptions: CalendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
    currentEvents: EventApi[] = [];
  
    handleCalendarToggle() {
      this.calendarVisible = !this.calendarVisible;
    }
  
    handleWeekendsToggle() {
      const { calendarOptions } = this;
      calendarOptions.weekends = !calendarOptions.weekends;
    }
  
    handleDateSelect(selectInfo: DateSelectArg) {
      const title = prompt('Please enter a new title for your event');
      const calendarApi = selectInfo.view.calendar;
  
      calendarApi.unselect(); // clear date selection
  
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        });
      }
    }
  
    handleEventClick(clickInfo: EventClickArg) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
      }
    }
  
    handleEvents(events: EventApi[]) {
      this.currentEvents = events;
    }
  

    currentdomaine = null;
    pays:Salle[];
    pay:Salle;
    closeResult:string;
   Events: any[] = [];
  
  
  
      constructor(
        //source = new LocalDataSource(tableData.data),// create the source
        //filterSource = new LocalDataSource(tableData.filerdata),// create the source
        //alertSource = new LocalDataSource(tableData.alertdata), // create the source
        private route:ActivatedRoute,
       
        private router:Router,
        private userService:SalleService,
        private modalService: NgbModal
      )  { this.pay=new Salle();}



     
  
      //  For confirm action On Delete
      onDeleteConfirm(event) {
          if (window.confirm('Are you sure you want to delete?')) {
              event.confirm.resolve();
          } else {
              event.confirm.reject();
          }
      }
  
      //  For confirm action On Save
      onSaveConfirm(event) {
          if (window.confirm('Are you sure you want to save?')) {
              event.newData['name'] += ' + added in code';
              event.confirm.resolve(event.newData);
          } else {
              event.confirm.reject();
          }
      }
  
      //  For confirm action On Create
      onCreateConfirm(event) {
          if (window.confirm('Are you sure you want to create?')) {
              event.newData['name'] += ' + added in code';
              event.confirm.resolve(event.newData);
          } else {
              event.confirm.reject();
          }
      }
      ngOnInit() {
       
        this.userService.getListSalles().subscribe(data=>
          this.pays=data)
      }
      onSubmit(){
        this.userService.addsalle(this.pay).subscribe
        (result => this.gotoUserList());
      }
      gotoUserList() {
        this.router.navigate(['/dashboard/dashboard1']);
        window.location.reload()
        
      }
      delete(id) {
        this.userService.deleteSalle(id)
          .subscribe(response => {
            console.log(response);
          })
          
      }
     
    
      open2(contentt) {
        this.modalService.open(contentt);
      }
      open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
      
      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }

}
