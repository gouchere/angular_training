import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  userEmail: string = 'yves@you.com'

  constructor(private router: Router) {}

  onContinue(): void {
    this.router.navigateByUrl('facesnaps')
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value)
  }
}
