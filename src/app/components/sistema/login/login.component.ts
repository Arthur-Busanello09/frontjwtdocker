import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { User } from 'src/app/models/user';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario: Usuario = new Usuario();
  roteador = inject(Router);
  login: Login = new Login();
  loginService = inject(LoginService);
  user = new User();

  constructor() {
    this.loginService.removerToken;
  }

  logar() {

    //implementar a requisição aqui e colocar o token no localstorage

    this.loginService.logar(this.login).subscribe({
      next: user => { // QUANDO DÁ CERTO
        this.user = user;

        this.loginService.addToken(user.token);
        this.roteador.navigate(['admin/produtos']);
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('login ou senha incorretos');
        console.error(erro);
      }
    });


  }

}