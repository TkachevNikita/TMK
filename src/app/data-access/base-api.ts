import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IFilter } from './interfaces/filter.interface';

/**
 * Базовый класс для работы с API. Использовать в качестве расширения для сущностей.
 * Реализует для конкретного типа и эндпоинта набор CRUD операций
 */
export class BaseAPI<T extends { id: string }> {
  private readonly endpoint: string;
  private readonly http = inject(HttpClient);

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public create(item: Partial<T>): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/${this.endpoint}`, item);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.endpoint}/${id}`);
  }

  public getAll(filters?: Partial<IFilter>): Observable<T[]> {
    return this.http.get<T[]>(`${environment.apiUrl}/${this.endpoint}`, { params: filters });
  }

  public getById(id: string): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${this.endpoint}/${id}`);
  }

  public update(item: Partial<T>): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/${this.endpoint}/${item.id}`, item);
  }
}
