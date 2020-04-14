import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { TableService } from 'src/app/services/table.service';

import Tabulator from 'tabulator-tables';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() tableData: any[] = [];
  @Input() columnNames: any[] = [];
  @Input() height: string = '500px';

  tab = document.createElement('div');

  constructor(private tableService: TableService) {
    console.log('inside Table creation...');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('inside Table creation...ngOnChanges');
    // this.drawTable();
  }

  ngOnInit(): void {
    console.log('inside Table creation...ngOnInit');
    this.drawTable();
  }

  private drawTable(): void {
    console.log('inside Table creation...drawTable');
    document.getElementById('my-tabular-table').appendChild(this.tab);

    new Tabulator(this.tab, {
      data: this.tableData,
      reactiveData: true, //enable data reactivity
      columns: this.columnNames,
      layout: 'fitData',
      height: this.height,
    });
  }
}
