import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterEvents'
})
export class FilterEvents implements PipeTransform {
  transform(items, value, field) {
    if (items.length === 0 || !value) {
      return items;
    }
    return items.filter(i => {
      const item = Object.assign({}, i);
      if (!isNaN(item[field])) {
        item[field] += '';
      }
      if (field === 'category') {
        item[field] = item['catName'];
      }
      if (field === 'type') {
        item[field] = item[field] === 'income' ? 'доход' : 'расход';
      }
      return item[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
