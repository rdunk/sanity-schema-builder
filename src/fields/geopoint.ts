import { StandardGenerator } from '../base';

export class GeopointFieldGenerator extends StandardGenerator {
  constructor(name: string, title?: string) {
    super('geopoint', name, title);
  }
}
