import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mycurr',
  templateUrl: './mycurr.component.html',
  styleUrls: ['./mycurr.component.css'],
})
export class MycurrComponent implements OnInit {
  login: FormGroup = new FormGroup({
    to_num: new FormControl(''),
    to_curr: new FormControl(''),
    form_curr: new FormControl(''),
  });
  form_num: string | undefined;
  eth: string | undefined;

  click() {
    let data = this.login.value;
    if (!data['to_num']) {
      alert('请输入需要兑换的钱数');
      parent.location.href = 'http://127.0.0.1:4200';
    }
    if (!data['to_curr']) {
      alert('请选择货币');
      parent.location.href = 'http://127.0.0.1:4200';
    }
    if (!data['form_curr']) {
      alert('请选择需要兑换的货币');
      parent.location.href = 'http://127.0.0.1:4200';
    }
    const httpOptions: any = {
      hearder: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    console.log(typeof data);

    let url = 'http://127.0.0.1:8080/api';

    this.http.post(url, data, httpOptions).subscribe((res) => {
      this.form_num = res['form_num'].toFixed(4);
      this.eth = res['eth'].toFixed(4);
    });
  }

  constructor(public http: HttpClient) {}
  ngOnInit(): void {}
}
