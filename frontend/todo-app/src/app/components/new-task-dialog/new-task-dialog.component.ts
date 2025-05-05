import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-task-dialog',
  standalone: true,
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css'],
  imports: [ReactiveFormsModule, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class NewTaskDialogComponent {
  dialogRef = inject(MatDialogRef);

  form = new FormGroup({
    description: new FormControl('', [Validators.required]),
    priority: new FormControl('MEDIA', [Validators.required]),
  });

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
