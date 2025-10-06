import { TuiRoot } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent, TuiRoot],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
