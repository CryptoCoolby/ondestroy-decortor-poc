import { Component, OnDestroy } from '@angular/core';

import * as moment from 'moment'
import { MOCK, MOCK2 } from './asd.mock';
import { ASD_MOCK_33 } from './asd/super-long.ormaybe.not.mock';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
type SourceMethodDescriptor<T> = TypedPropertyDescriptor<SourceMethod<T>>;
type SourceMethod<T> = (...args: any) => T;

// Get Started with Typescript Decorators
// https://medium.com/@rossbulat/get-started-with-typescript-decorators-cf3924c37f04
// Decorator Implementations: (class) Methods

export const LogReturnValue = <T>(
  target: Object,
  propertyKey: string,
  propertyDescriptor: SourceMethodDescriptor<T>,
) => {
  const originalMethod = propertyDescriptor.value
let didDestroy = false
  propertyDescriptor.value = function (...args) {
    const returnValue = originalMethod.call(this, ...args);

    console.log((this, Object.getPrototypeOf(this)))

    if (!didDestroy) {
      didDestroy = true;

      const proto = Object.getPrototypeOf(this)
      const oldDestroy = proto.ngOnDestroy;
      console.log(proto.ngOnDestroy);


      proto.ngOnDestroy = () => {
        console.log('destroyed2');
        oldDestroy()
        console.log('destroyed');

      }
      console.log(proto.ngOnDestroy)
    }

    if (typeof returnValue?.then === 'function') {
      return returnValue.then((ret: any) => {
        console.log({ promise: ret });
        return ret;
      })
    }

    if (returnValue instanceof Observable) {
      return returnValue.pipe(tap((ret: any) => console.log({ observable: ret })))
    }

    console.log(returnValue);
    return returnValue;
  };
};


console.log(moment());
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'wp-ignore';

  asd = MOCK
  asd2 = MOCK2
  asd3 = ASD_MOCK_33?.asd

  constructor() {
    console.log(this);
    console.log('ASD', this, Object.getPrototypeOf(this));


  }

  @LogReturnValue
  asdd() {
    console.log('faka', this, Object.getPrototypeOf(this), Object.getPrototypeOf(this).ngOnDestroy);

    return 'fasz'

  }

  ngOnDestroy()
  {
    console.log('ESTROYING');

    // console.log('ASD', this, Object.getPrototypeOf(this));
  }


}

