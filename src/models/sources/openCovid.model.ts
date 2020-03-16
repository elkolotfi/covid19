import {SourceModel} from './source.model';

export class OpenCovidModel {

  // tslint:disable-next-line:max-line-length
  constructor(public date: Date, public source: SourceModel, public code: string, public name: string, public cases: number, public deaths: number) {}

}
