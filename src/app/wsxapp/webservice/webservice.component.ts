import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {webService} from '../Services/webservice.service';
import {WebserviceModel} from '../Models/webservice.model';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Params} from '../Models/params.model';
import swal from "sweetalert2";

@Component({
  selector: 'webservice',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './webservice.component.html',
  styleUrls: ['./webservice.component.scss']
})
export class WebserviceComponent implements OnInit {
  @ViewChild('f', {static: false}) floatingLabelForm: NgForm;
  @ViewChild('vform', {static: false}) validationForm: FormGroup;
  selected = [];
  temp = [];
  @ViewChild('myTable',{static: false}) table: any;
  webServiceModel: WebserviceModel;
  rows: WebserviceModel[] = [];
  isSaving: boolean;
  timeout: any;
  row: string;
  n:number = 1;
  search = "";
  page: string;
  pagesizelist: number[] = [10, 20, 30];
  itemsPerPage = 10;
  public loading = false;
  controls: any = {
    pageSize:  10,
    filter: '',
  }
  public state: any = {
    tabs: {
      nav: 0
    }
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private webservice: webService) {}

  ngOnInit() {
    this.isSaving = false;
    this.selected = [];
    this.GetWebServices();
  }

  GetWebServices() {
    this.loading = true;
    this.webservice.getWebServices({
      page: 0,
      size: this.itemsPerPage,
      // sort: this.sort(),
      search: this.search
    }).subscribe(data => {
      this.rows = data;
      this.loading = false;
    })
  }

  CreateWebService(){
    console.log("works")
    this.isSaving = true;
    if (this.webServiceModel.id === null) {
      this.webservice.createWebService(this.webServiceModel).subscribe(
          (response) => {
            console.log(response);
            this.toastr.success("Webservice added successfully !");
            setTimeout(() => {
              this.GetWebServices();
            }, 1500);
            this.router.navigate(['/wsx/webservice'])
          },
          (error) => {
            console.log(error);
            this.toastr.error("An error has occurred !");
            setTimeout(() => {
              this.GetWebServices();
            }, 1500);
            this.router.navigate(['/wsx/webservice'])
          }
      );
    }
    else {
      this.webservice.updateWebService(this.webServiceModel).subscribe(
          (response) => {
            console.log(response);
            this.toastr.success("Webservice updated successfully  !");
            setTimeout(() => {
              this.GetWebServices();
            }, 1500);
            this.router.navigate(['/wsx/webservice'])
          },
          (error) => {
            console.log(error);
            this.toastr.error("An error has occurred !");
            setTimeout(() => {
              this.GetWebServices();
            }, 1500);
            this.router.navigate(['/wsx/webservice'])
          }
      );
    }
    this.router.navigate(['/wsx/webservice'])
  }

  confirmDelete(){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        swal.fire(
            'Deleted!',
            'Your webservice has been deleted.',
            'success'
        )
        this.DeleteWebservices();
      }
    })
  }

  DeleteWebservices() {
    for (let i of this.selected){
      this.webservice.deleteWebService(i.id).subscribe(
          (response) => {
            console.log(response);
            setTimeout(() => {
              this.GetWebServices();
            }, 1500);
          });
    }
  }

  RefreshWebServiceTable() {
    this.GetWebServices();
  }

  TestConnection(row,id){
    row.loadingSpinner = true;
    setTimeout(() => {
      row.loadingSpinner = false;
      this.webservice.testConnection(id).subscribe((response)=> {
            if(response.status == 200){
              this.toastr.success("Connection success  ! ");
            }
          },
          err => {
            this.toastr.error("Connection failed !");
          }
      )
    }, 500);
  }

  CheckConnection(row){
    row.loadingSpinner = true;
    setTimeout(() => {
      row.loadingSpinner = false;
      this.webservice.checkConnection(this.webServiceModel).subscribe(response=>  {
            this.toastr.success("Connection success  ! ");
          },
          err => {
            this.toastr.error("Connection failed !");
          })
    }, 500);
  }

  addNewItem(){
    const row = new WebserviceModel();
    row.params = new Params()
    row.$$expanded = false ;
    this.rows = [...this.rows, row];
    this. toggleExpandRow(row);

    setTimeout(() => {
      this.toggleExpandRow(row);
      setTimeout(() => {
        this.scrollToBottom();
      },25);
    },100);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return !val || ['webserviceName'].some((field: any) => {
        return d[field].toLowerCase().indexOf(val) !== -1
      })
    });
    this.rows = this.temp;
    this.table.offset = 0;
    setTimeout(() => {
      this.GetWebServices();
    }, 7000);
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }

  toggleExpandRow(row) {
    this.webServiceModel = new WebserviceModel();
    this.webServiceModel=row;
    row.$$expanded=!row.$$expanded;
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  toggleExpandNewRow() {
    this.webServiceModel = new WebserviceModel();
    this.table.rowDetail.toggleExpandRow(this.webServiceModel);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  @Input()  public options = {
    mode: 'inline',
    disabled: false,
    inline: true
  };

  onChange(){
    this.options.mode = this.options.inline ? 'inline' : 'popup'
  }

  private onSaveSuccess(result) {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  previousState() {
    window.history.back();
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  updatePageSize(value) {
    if(!this.controls.filter){
      this.rows = [...this.temp];
      this.table.offset = 0;
    }
    this.controls.pageSize = parseInt(value)
    this.table.limit = this.controls.pageSize;
    window.dispatchEvent(new Event('resize'));
  }

  @Input() cssClasses: any = {
    sortAscending: 'fa fa-sort-up',
    sortDescending: 'fa fa-sort-down',
    pagerLeftArrow: 'fa  fa-angle-left',
    pagerRightArrow: 'fa fa-angle-right',
    pagerPrevious: 'fa fa-angle-double-left',
    pagerNext: 'fa fa-angle-double-right'
  };

  dbTypeChange(){
    if(this.webServiceModel.params.dbType == 'postgresql'){
      this.webServiceModel.params.dbPort = '5432'
      this.webServiceModel.params.dbDriver = 'jdbc:postgresql'
    } else if(this.webServiceModel.params.dbType == 'mysql') {
      this.webServiceModel.params.dbPort = '3306'
      this.webServiceModel.params.dbDriver = 'jdbc:mysql'
    }else if(this.webServiceModel.params.dbType == 'oracle') {
      this.webServiceModel.params.dbPort = '3938'
      this.webServiceModel.params.dbDriver = 'jdbc:oracle'
    }else if(this.webServiceModel.params.dbType == 'mongodb') {
      this.webServiceModel.params.dbPort = '27017'
      this.webServiceModel.params.dbDriver = 'mongodb'
    }
  }
  scrollToBottom(x=0): void {
    let b=10;
    try {
      if ($(".datatable-body")[0].scrollTop < $(".datatable-body")[0].scrollHeight -b){
        $(".datatable-body")[0].scrollTop = $(".datatable-body")[0].scrollTop + this.n;
        this.scrollToBottom();
      }
    } catch(err) { }
  }

}
