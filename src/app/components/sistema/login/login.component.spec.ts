import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to admin products on successful admin login', fakeAsync(() => {
    component.login = { username: 'admin', password: 'admin' };
    component.logar();
    tick(); 
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/produtos']);
  }));

  it('should show an alert on login failure', fakeAsync(() => {
    spyOn(window, 'alert');
    component.login = { username: 'nao', password: 'blahblah' };
    component.logar();
    tick(); 
    expect(window.alert).toHaveBeenCalledWith('Login ou senha incorretos');
  }));

});