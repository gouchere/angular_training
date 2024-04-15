import { Injectable } from '@angular/core'
import { FaceSnapModel } from '../models/face-snap.model'
import { HttpClient } from '@angular/common/http'
import { Observable, map, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  faceSnaps: FaceSnapModel[] = []
  faceSnaps$!: Observable<FaceSnapModel[]>
  constructor(private http: HttpClient) {}

  getAllFaceSnaps(): Observable<FaceSnapModel[]> {
    return this.http.get<FaceSnapModel[]>('http://localhost:3000/facesnaps')
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnapModel> {
    return this.http.get<FaceSnapModel>(
      `http://localhost:3000/facesnaps/${faceSnapId}`
    )
  }

  snapFaceSnapById(
    faceSnapId: number,
    inc: boolean
  ): Observable<FaceSnapModel> {
    return this.getFaceSnapById(faceSnapId).pipe(
      map((faceSnap) => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (inc ? 1 : -1),
      })),
      switchMap((updateFaceSnap) =>
        this.http.put<FaceSnapModel>(
          `http://localhost:3000/facesnaps/${faceSnapId}`,
          updateFaceSnap
        )
      )
    )
  }

  addFaceSnap(faceSnap: FaceSnapModel): Observable<FaceSnapModel> {
    return this.getAllFaceSnaps().pipe(
      map((facesnaps) => [...facesnaps].sort((a, b) => a.id - b.id)),
      map((sortedFaceSnap) => sortedFaceSnap[sortedFaceSnap.length - 1]),
      map((previousFaceSnap) => ({
        ...faceSnap,
        snaps: 0,
        createdDate: new Date(),
        id: previousFaceSnap.id + 1,
      })),
      switchMap((newFaceSnap) =>
        this.http.post<FaceSnapModel>(
          `http://localhost:3000/facesnaps/`,
          newFaceSnap
        )
      )
    )
    // this.faceSnaps.push({
    //   ...faceSnap,
    //   id: this.faceSnaps[this.faceSnaps.length - 1].id + 1,
    // })
  }
}
