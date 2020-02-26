import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomEventsService implements OnDestroy {

  private sources: Subject<any>[];

  private names: object;
  constructor() {
    this.sources = [];
    this.names = {};
  }

  ngOnDestroy() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.sources.length; i++) {
      this.sources[i].complete();
    }

    this.sources = undefined;
    this.names = undefined;
  }

  private crateSubject(name: string): Subject<any> {
    if (this.names[name] === undefined) {
      this.sources.push((new Subject<any>()));
      this.names[name] = this.sources.length - 1;

      return this.sources[this.names[name]];
    }
    return undefined;
  }

  public publish(name: string, value: any): void {

    if (this.names[name] !== undefined) {
      this.sources[this.names[name]].next(value);
    } else {
      const subject = this.crateSubject(name);
      subject.next(value);
    }

  }

  public subscribe(name: string): Observable<any> {
    if (this.names[name] !== undefined) {
      return this.sources[this.names[name]].asObservable();
    } else {
      const subject = this.crateSubject(name);
      return subject.asObservable();
    }
  }
}
