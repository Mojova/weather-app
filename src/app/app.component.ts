import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {MatGridList} from "@angular/material/grid-list";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, MatGridList,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-app';
}
