import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../image.service';
import { catchError, map, Observable, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auditorprofile',
  imports: [AsyncPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './auditorprofile.html',
  styleUrl: './auditorprofile.css',
})
export class Auditorprofile {
  private activatedRoute = inject(ActivatedRoute);
  private imageService = inject(ImageService);
  auditorInfo$!: Observable<any>;

  visible = false;
  
  servicesList: any[] = [];

  form = new FormGroup({
    services: new FormControl<string[]>([]),
    file: new FormControl<File | null>(null)
  });

  selectedFileName: string | null = null;

  private employeeId = this.activatedRoute.snapshot.paramMap.get('id');

  async ngOnInit() {
    this.auditorInfo$ = this.imageService.getAuthorById(this.employeeId!)
      .pipe(
        (map((response: any) => { return response?.data })),
        tap(auditorInfo => this.servicesList = auditorInfo.services),
        catchError((error: Error) => {
          console.log("error in admin register", error.message);
          throw error;
        })
      );

    console.log(this.auditorInfo$);
  }

  onSendRequest(email: string) {
    console.log(email);
    window.location.href = `mailto:${email}`;
  }

  onSubmitRequest() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    // optionally reset form when closing:
    // this.form.reset({ services: [], file: null });
    // this.selectedFileName = null;
  }

  get selectedServices(): string[] {
    return this.form.value.services ?? [];
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.form.patchValue({ file: null });
      this.selectedFileName = null;
      return;
    }
    const file = input.files[0];
    this.form.patchValue({ file });
    this.selectedFileName = file.name;
  }

  clearFile() {
    // clear file input programmatically by resetting the form control
    this.form.patchValue({ file: null });
    this.selectedFileName = null;

    // Note: if you need to clear the native <input type="file"> too,
    // keep a template reference to it and set input.value = '' in the TS.
  }

  submitRequest() {
    const formValue = this.form.value;
    // Do something useful with the selections & file here:
    console.log('Submitting request...');
    console.log('Selected service codes:', formValue.services);
    console.log('Selected file:', formValue.file);

    // Example: send to API with FormData
    // const fd = new FormData();
    // formValue.services.forEach(s => fd.append('services[]', s));
    // if (formValue.file) fd.append('file', formValue.file);
    // this.http.post('/api/request', fd).subscribe(...)

    // close after submit
    this.visible = false;
  }

}
