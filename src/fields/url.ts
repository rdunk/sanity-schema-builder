import { StandardGenerator } from '../base';

export class UrlFieldGenerator extends StandardGenerator {
  constructor(name: string, title?: string) {
    super('url', name, title);
  }
}
