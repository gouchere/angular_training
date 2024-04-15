import { Component, Input, OnInit } from '@angular/core'
import { FaceSnapModel } from '../models/face-snap.model'
import { FaceSnapsService } from '../services/face-snaps.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss',
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnapModel
  @Input() numero!: number

  constructor(
    private faceSnapService: FaceSnapsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onViewFaceSnap() {
    this.router.navigateByUrl('facesnaps/' + this.faceSnap.id, {})
  }
  onAddSnap() {
    if (!this.faceSnap.isSnap) {
      this.faceSnapService.snapFaceSnapById(this.faceSnap.id, true)
    } else {
      this.faceSnapService.snapFaceSnapById(this.faceSnap.id, false)
    }
    this.faceSnap.isSnap = !this.faceSnap.isSnap
  }

  toUpperCase() {
    return this.faceSnap.title.toUpperCase
  }
}
