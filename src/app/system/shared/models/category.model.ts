export class CategoryModel {
  constructor(public name: string, public limit: number, private costs: number = 0) {
  }
}
