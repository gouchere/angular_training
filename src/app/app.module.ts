import { NgModule } from '@angular/core'
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FaceSnapComponent } from './face-snap/face-snap.component'
import { OneComponentComponent } from './one-component/one-component.component'
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { LandingPageComponent } from './landing-page/landing-page.component'
import { SingleFaceSnapComponent } from './single-face-snap/single-face-snap.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NewFaceSnapComponent } from './new-face-snap/new-face-snap.component'
import { HttpClient, HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    OneComponentComponent,
    FaceSnapComponent,
    FaceSnapListComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    SingleFaceSnapComponent,
    NewFaceSnapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
