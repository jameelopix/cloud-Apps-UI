import {
  Component,
  OnInit,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild,
} from '@angular/core';
import { TableService } from '../services/table.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { ClientService } from '../services/client.service';
import { RandomService } from '../services/random.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css'],
  providers: [{ provide: TableService }],
})
export class ScreenComponent implements OnInit {
  addColumnForm: FormGroup;
  addColumnDialogDisplay: boolean = false;

  columns: any[] = [];

  // [
  //   { title: 'Name', field: 'name', width: 150 },
  //   { title: 'Age', field: 'age', hozAlign: 'left', formatter: 'progress' },
  //   { title: 'Favourite Color', field: 'col' },
  //   { title: 'Date Of Birth', field: 'dob', hozAlign: 'center' },
  //   { title: 'Rating', field: 'rating', hozAlign: 'center', formatter: 'star' },
  //   {
  //     title: 'Passed?',
  //     field: 'passed',
  //     hozAlign: 'center',
  //     formatter: 'tickCross',
  //   },
  // ];

  data: any[] = [];

  // [
  //   { id: 1, name: 'Oli Bob', age: '12', col: 'red', dob: '' },
  //   { id: 2, name: 'Mary May', age: '1', col: 'blue', dob: '14/05/1982' },
  //   {
  //     id: 3,
  //     name: 'Christine Lobowski',
  //     age: '42',
  //     col: 'green',
  //     dob: '22/05/1982',
  //   },
  //   {
  //     id: 4,
  //     name: 'Brendon Philips',
  //     age: '125',
  //     col: 'orange',
  //     dob: '01/08/1980',
  //   },
  //   {
  //     id: 5,
  //     name: 'Margret Marmajuke',
  //     age: '16',
  //     col: 'yellow',
  //     dob: '31/01/1999',
  //   },
  // ];

  height: string = '600px';

  componentRef: any;
  @ViewChild('vf', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(
    private vf: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private tableService: TableService,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private randomService: RandomService
  ) {
    this.createFormGroup();
  }

  // constructor(

  // ) {
  // }

  ngOnInit(): void {}

  createFormGroup() {
    this.addColumnForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
    });
  }

  createTableSuccessCallback = (response: any) => {
    const factory = this.resolver.resolveComponentFactory(TableComponent);

    this.componentRef = this.entry.createComponent(factory);

    var table = response['table'];
    var columnMap = table['columnMap'];

    // { title: 'Name', field: 'name', width: 150 }

    // columnMap.forEach((element) => {
    //   this.columns.push({
    //     title: element['displayName'],
    //     field: element['name']
    //   });
    // });

    for (let key in columnMap) {
      var value = columnMap[key];
      this.columns.push({
        title: key,
        field: value['name'],
      });
    }

    // columnMap.forEach((value: any, key: string) => {
    //   this.columns.push({
    //     title: key,
    //     field: value['name'],
    //   });
    // });

    this.componentRef.instance.tableData = this.data;
    this.componentRef.instance.columnNames = this.columns;
    this.componentRef.instance.height = this.height;
  };

  public createTable(event) {
    console.log('inside createTable...');

    var request = {
      values: {
        id: this.randomService.generateTableKey(),
      },
    };

    this.clientService.post(
      'createTable',
      request,
      this.createTableSuccessCallback
    );
  }

  public saveAddColumn(event) {
    console.log('inside saveAddColumn...');

    this.addColumnDialogDisplay = false;
  }

  public cancelAddColumn(event) {
    console.log('inside cancelAddColumn...');

    this.addColumnDialogDisplay = false;
  }

  public addColumn(event) {
    console.log('add:' + event);
    console.log('value:' + this.tableService.value);

    this.addColumnDialogDisplay = true;
  }

  public alterColumn(event) {
    console.log('alter:' + event);
    console.log('value:' + this.tableService.value);
  }

  public deleteColumn(event) {
    console.log('delete:' + event);
    console.log('value:' + this.tableService.value);
  }

  getAddColumnControl(field: any) {
    return this.addColumnForm.controls[field];
  }
}
