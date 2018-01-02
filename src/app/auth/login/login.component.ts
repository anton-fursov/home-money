import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Messege } from '../../shared/models/messege.model';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fadeStateTrigger } from '../../shared/animations/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  messege: Messege;

  constructor(private userService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.messege = new Messege('', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLoggin']) {
        this.showMessage('success', 'Теперь можете войти в свой аккаунт');
      }
      else if (params['accessDenied']) {
        this.showMessage('warning', 'Для работы с системой необходимо войти');
      }
    });
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(type: string, text: string) {
    this.messege = new Messege(type, text);
    setTimeout(() => {
      this.messege.text = '';
    }, 5000);
  }
  onSubmit() {
    const formData = this.form.value;
    this.userService.login(formData)
      .subscribe((res:any) => {
        if (res.token) {
          window.localStorage.setItem('user', JSON.stringify(res));
          this.authService.login();
          this.router.navigate(['/system', 'bill']);
        }
        else {
          this.showMessage('danger', 'Имя пользователя или пароль не верны.');
        }
      });
  }

}
