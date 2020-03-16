import {PointModel} from './point.model';
import {RegionModel} from './region.model';

export class CountryModel {

  constructor(public id: number, public name: string, public regions: RegionModel[] = [],
              public cases: { label: string, points: PointModel[] } = {label : '', points :  []},
              public deaths: { label: string, points: PointModel[] } = {label : '', points :  []}) {
  }
}
