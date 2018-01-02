import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/sevices/api.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Input() categories;
  form: FormGroup;
  value;
  currentCategory;
  isLoaded = false;

  constructor(private apiService: ApiService) {
  }

  setCurrentCategory() {

    this.currentCategory = this.categories.find(el => el._id === this.value);
    this.isLoaded = true;
  }

  ngOnInit() {
    this.value = this.categories[0]._id;
    this.setCurrentCategory();
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'limit': new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  editCategory() {

    const data = this.form.value;
    data.id = this.value;
    this.apiService.editCategory(data).subscribe();
    location.reload();

  }


}
