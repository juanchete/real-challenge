import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListingComponent } from './pages/product-listing/product-listing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'skyrise-furniture';
}
