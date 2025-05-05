import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskDialogComponent } from '../../components/new-task-dialog/new-task-dialog.component';
import { Priority, Task, ToDoService } from '../../core/services/to-do.service';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
// import { TodoService } from '../../core/services/auth.service';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit {
  public username: string = '';
  tasks$!: Observable<Task[]>;
  pendingTasks$!: Observable<Task[]>
  completedTasks$!: Observable<Task[]>

  dialog = inject(MatDialog);

  constructor(private todoService: ToDoService, private toastr: ToastrService) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.pendingTasks$ = this.todoService.pendingTasks$;
    this.completedTasks$ = this.todoService.completedTasks$;

    this.todoService.list();
  }

  openNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { description, priority } = result

        this.todoService.create(description, priority, false).subscribe({
          next: (item) => {
            this.todoService.list();
            this.toastr.success('Tarefa cadastrada.', 'Sucesso');
          },
          error: (err) => {
            this.toastr.error('Não foi possível cadastrar a tarefa. Verifique se o servidor está ativo.', 'Erro');
            console.error('Falha ao cadastrar tarefa', err);
          }
        });
      }
    });
  }

  markAsCompleted(taskId: string): void {
    this.todoService.updateTaskCompleted(taskId, true).subscribe({
      next: () => {
        this.todoService.list();
        this.toastr.success('Tarefa concluída.', 'Sucesso');
      },
      error: (err) => {
        this.toastr.error('Não foi possível concluir a tarefa. Verifique se o servidor está ativo.', 'Erro');
        console.error('Erro ao concluir tarefa', err);
      }
    });
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('name')

    window.location.reload()
  }
}
