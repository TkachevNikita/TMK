import { TuiRoot } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent, TuiRoot, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
