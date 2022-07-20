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
    currentdomaine = null;
    pays:Salle[];
    pay:Salle;
    closeResult:string;
   
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
          window.location.reload()
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
