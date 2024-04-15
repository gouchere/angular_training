import { Component, OnDestroy, OnInit } from '@angular/core'
import { FaceSnapModel } from '../models/face-snap.model'
import { FaceSnapsService } from '../services/face-snaps.service'
import { Observable, Subject, interval, takeUntil, tap } from 'rxjs'

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss',
})
export class FaceSnapListComponent implements OnInit, OnDestroy {
  faceSnaps!: FaceSnapModel[]
  faceSnaps$!: Observable<FaceSnapModel[]>

  private destroy$!: Subject<boolean>

  constructor(private faceSnapSrvice: FaceSnapsService) {}

  ngOnInit(): void {
    // this.faceSnaps = this.faceSnapSrvice.getAllFaceSnaps()
    this.destroy$ = new Subject<boolean>()
    //interval(1000).pipe(takeUntil(this.destroy$), tap(console.log)).subscribe()
    this.faceSnaps$ = this.faceSnapSrvice.getAllFaceSnaps()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }
}
