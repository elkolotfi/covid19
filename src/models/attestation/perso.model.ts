export class PersoModel {
  private Name: string;

  constructor(public firstname = '', public lastname = '', public birthday: Date = new Date(), public birthplace = '',
              public address = '', public reason = -1,
              public city = '', public today: Date = new Date()) {
  }
  get name(): string {
    return [this.lastname, this.firstname].join(' ');
  }
}
