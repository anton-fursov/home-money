export class EventModel {
  constructor(public typeName: string,
              public amount: number,
              public category: string,
              public date: string,
              public description: string
  ) {
  }
}
