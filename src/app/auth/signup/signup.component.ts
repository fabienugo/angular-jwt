import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl(''),
      name: new FormControl(''),
      password: new FormControl('')
    });
  }

  public submit(): void {
    this.authService.signup(this.form.value).subscribe((user: User) => {
      this.router.navigate(['/signin']);
    }, err => {
        this.error = err;
    });
  }

}
