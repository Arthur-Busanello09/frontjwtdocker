import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { rotaguardGuard } from './rotaguard.guard';

describe('rotaguardGuard', () => {
  let guard = TestBed.inject(rotaguardGuard);
  let router: Router;
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rotaguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should be created', () => {
    expect(executeGuard).not.toBe(null);
  })
  // it('should redirect to login if not authenticated', fakeAsync(() => {
  //   localStorage.removeItem('authToken'); 
  //   const route = {} as ActivatedRouteSnapshot;
  //   const state = {} as RouterStateSnapshot;

  //   // canActivate might be async, so wrap in fakeAsync
  //   const result = guard.canActivate(route, state);

  //   tick(); // Simulate passage of time for async operations

  //   expect(result).toBeFalse();
  //   expect(router.navigate).toHaveBeenCalledWith(['/login']);
  // }));

});
