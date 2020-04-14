import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  private APP_KEY_LENGTH: number = 15;
  private TABLE_KEY_LENGTH: number = 15;
  private COLUMN_KEY_LENGTH: number = 15;

  private ALPHA: string =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  private PREFIX_APP: string = 'APP_';
  private PREFIX_TABLE: string = 'TAB_';
  private PREFIX_COLUMN: string = 'COL_';

  constructor() {}

  public generateAppKey(): string {
    return this.generateKey(this.PREFIX_APP, this.APP_KEY_LENGTH);
  }
  public generateTableKey(): string {
    return this.generateKey(this.PREFIX_TABLE, this.TABLE_KEY_LENGTH);
  }
  public generateColumnKey(): string {
    return this.generateKey(this.PREFIX_COLUMN, this.COLUMN_KEY_LENGTH);
  }

  private generateKey(prefix: string, length: number): string {
    var rtn = prefix;
    for (var i = 0; i < length; i++) {
      rtn += this.ALPHA.charAt(Math.floor(Math.random() * this.ALPHA.length));
    }
    return rtn;
  }
}
