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

export function LogReturnValue (
  target: Object,
  propertyKey: string,
  propertyDescriptor: SourceMethodDescriptor<any>,
) {
  const originalMethod = propertyDescriptor.value
  console.log("asdasd T",
  '\ntarget',target,
  // '\nngOnDestroy',target?.ngOnDestroy,
    '\npropertyDescriptor',propertyDescriptor,
    '\nthis', this,
   '\nkeys',target && Object.keys(target.constructor),
   '\nkeys',target && Object.getPrototypeOf(Object.getPrototypeOf(target).constructor),
   '\nkeys',target && Object.getPrototypeOf(target),
   '\nproto',target && Object.getPrototypeOf(Object.getPrototypeOf(target.constructor)),
   '\nproto',target && Object.getPrototypeOf(Object.getPrototypeOf(target).constructor),
   '\noriginalMethod',originalMethod);

  // target.ngOnDestroy = () => 'PREINIT'

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


export function Min(limit: number) {
  return function(target: Object, propertyKey: string) {
    let value : string;
    let destroyed = true;
    const getter = function() {
      console.log('getting destroy',destroyed, value, this, target);
      if (destroyed) {
        destroyed = false;
        console.log('DEEE3STROY');
      }


      return value;
    };
    const setter = function(newVal: string) {
      console.log('setasd', value, this, target);
      if(newVal.length < limit) {
         console.log('if',value, newVal);
         Object.defineProperty(target, 'errors', {
           value: `Your password should be bigger than ${limit}`
          });
        }
        else {
        console.log('else',value, newVal);
        console.log('getOwnPropertyDescriptors',Object.getOwnPropertyDescriptors(target));
        console.log('getOwnPropertyDescriptors3',Object.getOwnPropertyDescriptors(target));
        console.log('getOwnPropertyDescriptor24',Object.getOwnPropertyDescriptors(Object.getPrototypeOf(target)));
        console.log('getOwnPropertyDescriptor2s',Object.getOwnPropertyDescriptors(Object.getPrototypeOf(target)));
        console.log(value, newVal);
      }
      value = newVal;

      console.log(value, newVal);

    };
    console.log('getOwnPropertyDescriptors',Object.getOwnPropertyDescriptors(target));
    console.log('getOwnPropertyDescriptors3',Object.getOwnPropertyDescriptors(target));
    console.log('getOwnPropertyDescriptor24',Object.getOwnPropertyDescriptors(Object.getPrototypeOf(target)));
    console.log('getOwnPropertyDescriptor2s',Object.getOwnPropertyDescriptors(Object.getPrototypeOf(target)));

    console.log('HASPROP', target.hasOwnProperty('ngOnDestroy'));


    Object.defineProperty(Object.getPrototypeOf(target), 'ngOnDestroy', {
      get: function () {
        console.log('called');

        return getter
      },
      set: setter
    });
    console.log('HASPROP', target.hasOwnProperty('ngOnDestroy'));
  }
}

console.log(moment());
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  @Min(2)
  title = 'wp-ignore';

  asd = MOCK
  asd2 = MOCK2
  asd3 = ASD_MOCK_33?.asd

  constructor() {
    console.log(this);
    console.log('ASD', this, Object.getPrototypeOf(this));
    this.asdd()


  }

  // @LogReturnValue
  asdd() {
    console.log('faka', this, Object.getPrototypeOf(this), Object.getPrototypeOf(this).ngOnDestroy);

    return 'fasz'

  }

  ngOnDestroy() {
    console.log('ESTROYING');

    // console.log('ASD', this, Object.getPrototypeOf(this));
  }


}

