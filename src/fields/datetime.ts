import { StandardGenerator } from '../base';

export class DatetimeFieldGenerator extends StandardGenerator {
  protected _options: {
    dateFormat?: string;
    timeFormat?: string;
    timeStep?: number;
    calendarTodayLabel?: string;
  } = {};

  constructor(name?: string, title?: string) {
    super('datetime', name, title);
  }

  format({ date, time }: { date?: string; time?: string }) {
    if (date) {
      this._options.dateFormat = date;
    }
    if (time) {
      this._options.timeFormat = time;
    }
    return this;
  }

  step(step: number) {
    this._options.timeStep = step;
    return this;
  }

  todayLabel(label: string) {
    this._options.calendarTodayLabel = label;
    return this;
  }
}
