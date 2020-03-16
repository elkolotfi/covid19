import {CountryModel} from './country.model';

export class GlobalModel {

  constructor(public countries?: CountryModel[], public lastUpdate?: Date,
              public casesNumber = 0, public newCases = 0,
              public deathsNumber = 0, public newDeaths = 0) {
  }
}
