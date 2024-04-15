import { Component, Input, OnInit } from '@angular/core'
import { FaceSnapModel } from '../models/face-snap.model'
import { FaceSnapsService } from '../services/face-snaps.service'
import { ActivatedRoute } from '@angular/router'
import { Observable, tap } from 'rxjs'

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss',
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnapModel>
  @Input() numero!: number
  isSnap: boolean = false

  constructor(
    private faceSnapService: FaceSnapsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const faceSnapId = +this.route.snapshot.params['id']
    this.faceSnap$ = this.faceSnapService.getFaceSnapById(faceSnapId)
  }

  onAddSnap(faceSnapId: number) {
    if (!this.isSnap) {
      this.faceSnapService
        .snapFaceSnapById(faceSnapId, true)
        .pipe(
          tap(() => {
            this.faceSnap$ = this.faceSnapService.getFaceSnapById(faceSnapId)
            this.isSnap = true
          })
        )
        .subscribe()
    } else {
      this.faceSnapService
        .snapFaceSnapById(faceSnapId, false)
        .pipe(
          tap(() => {
            this.faceSnap$ = this.faceSnapService.getFaceSnapById(faceSnapId)
            this.isSnap = false
          })
        )
        .subscribe()
    }
  }
}
