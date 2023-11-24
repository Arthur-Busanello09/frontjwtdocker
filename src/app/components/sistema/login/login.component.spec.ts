import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { Login } from 'src/app/models/login';
import { Usuario } from 'src/app/models/usuario';
import { By } from '@angular/platform-browser';

class MockLoginService {
  logar(login: any) {
    if (login.username === 'admin' && login.password === 'admin') {
      return of({ token: 'adminToken' });
    } else {
      return throwError(() => new Error('Login failed'));
    }
  }
}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService: MockLoginService
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useClass: MockLoginService },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockLoginService = TestBed.inject(LoginService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });


  beforeEach(() => {
    let usuario = new Usuario();
    usuario.login = 'admin';
    usuario.senha = 'admin';
    component.usuario = usuario;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to admin products on successful admin login', fakeAsync(() => {
    component.login = { username: 'admin', password: 'admin' };
    component.logar();
    tick(); 
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/produtos']);
  }));

  it('should show an alert on invalid credentials', fakeAsync(() => {
    spyOn(window, 'alert');
    component.login = { username: 'invalidUser', password: 'invalidPassword' };
    component.logar();
    tick(); 
    expect(window.alert).toHaveBeenCalledWith('Login ou senha incorretos');
  }));

  it('Teste de 1 @Input -  template', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(elemento.nativeElement.ngModel).toEqual('admin');
  });
  it('Teste de 1 @Input - template pra senha', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputPassword1"]'));
    expect(elemento.nativeElement.ngModel).toEqual('admin');
  })

  it('Teste 2 de @Input - template', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="exampleInputText1"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });
  
});