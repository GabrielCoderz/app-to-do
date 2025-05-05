import { environment } from './../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export enum Priority {
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAIXA = 'BAIXA'
}

export interface Task {
  id: string;
  description: string;
  priority: Priority;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private baseUrl = `${environment.apiUrl}`;
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  public pendingTasks$ = this.tasks$.pipe(
    map(tasks => tasks.filter(task => !task.completed))
  );

  public completedTasks$ = this.tasks$.pipe(
    map(tasks => tasks.filter(task => task.completed))
  );

  constructor(private http: HttpClient) {}

  create(description: string, priority: Priority, completed: boolean) {
    console.log(priority)
    return this.http.post<{ id: string, description: string, priority: string, completed: boolean }>(`${this.baseUrl}/tasks`, { description, priority, completed });
  }

  list() {
    this.http.get<Task[]>(`${this.baseUrl}/tasks`).subscribe((tasks) => this.tasksSubject.next(tasks));
  }

  updateTaskCompleted(id: string, completed: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/tasks/${id}/completed`, { completed });
  }
}
