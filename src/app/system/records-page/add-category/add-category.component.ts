import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from '../../shared/models/category.model';
import { ApiService } from '../../shared/sevices/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  @Input() categories;
  @Output() onAddCategory = new EventEmitter();

  form: FormGroup;


  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'limit': new FormControl(1, [Validators.required, Validators.min(1)])
    });
  }

  addCategory() {
    const categorie = new CategoryModel(this.form.value.name, this.form.value.limit, 0 );
    this.apiService.addCategories(categorie).subscribe(() => {
      this.form.setValue({
        name: ' ',
        limit: 1
      });
    });
    this.onAddCategory.emit(categorie.name);

  }

}
