import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from '../components/sistema/login/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginService', () => {
  let service: LoginService;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(LoginService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('teste logar', () => {
    const loginMock = { username: 'testuser', password: 'testpassword' };
    spyOn(service['http'], 'post').and.callThrough();
    service.logar(loginMock).subscribe();
    expect(service['http'].post).toHaveBeenCalledWith(service.API, loginMock);
  });
  it('teste deslogar', () => {
    spyOn(service['http'], 'get').and.callThrough();
    service.deslogar().subscribe();
    expect(service['http'].get).toHaveBeenCalledWith(service.API + '/deslogar');
  });
});