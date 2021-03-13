import { StandardGenerator } from '../base';

export class DateFieldGenerator extends StandardGenerator {
  protected _options: {
    dateFormat?: string;
    calendarTodayLabel?: string;
  } = {};

  constructor(name?: string, title?: string) {
    super('date', name, title);
  }

  format(format: string) {
    this._options.dateFormat = format;
    return this;
  }

  todayLabel(label: string) {
    this._options.calendarTodayLabel = label;
    return this;
  }
}
