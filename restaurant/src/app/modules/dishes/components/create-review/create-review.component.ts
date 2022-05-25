import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { VisualizationService } from '@core/services/visualization.service'

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html'
})
export class CreateReviewComponent implements OnInit {
  @Output() popupClosedEvent = new EventEmitter<void>()
  @Input() heading!: string

  constructor(private visualizationService: VisualizationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.visualizationService.setPopupOpen(true)
  }

  onClose(): void {
    this.visualizationService.setPopupOpen(false)
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
