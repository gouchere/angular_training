import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import {
  Observable,
  delay,
  filter,
  interval,
  map,
  of,
  tap,
  take,
  mergeMap,
  Subject,
} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'first-app'

  interval!: Observable<string>
  private destroy$!: Subject<boolean>

  redTrainsCalled = 0
  yellowTrainsCalled = 0

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // interval(500)
    //   .pipe(
    //     take(10),
    //     map((value) => (value % 2 === 0 ? `rouge` : `jaune`)),
    //     tap((text) => this.logger(text)),
    //     mergeMap((color) => this.getTrainObservable$(color)),
    //     tap((train) =>
    //       console.log(
    //         `Train %c${train.color} ${train.trainIndex} arrivé !`,
    //         `font-weight: bold; color: ${this.translateColor(train.color)}`
    //       )
    //     )
    //   )
    //   .subscribe()
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : '#F1D86B'
  }

  getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain = color === 'rouge'
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++

    const trainIndex = isRedTrain
      ? this.redTrainsCalled
      : this.yellowTrainsCalled
    console.log(
      `Train %c${color} ${trainIndex}appelé !`,
      `text-decoration: underline; color: ${this.translateColor(color)}`
    )

    return of({ color, trainIndex }).pipe(delay(isRedTrain ? 5000 : 6000))
  }

  logger(text: string) {
    console.log(`La lumière s'allume en %c${text}`)
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.')
  }
}
