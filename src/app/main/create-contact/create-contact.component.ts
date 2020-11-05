import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contacto } from 'src/app/core/modelos/contacto.model';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss'],
})
export class CreateContactComponent implements OnInit {
  contactForm: FormGroup;
  loading: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<CreateContactComponent>,
    private fb: FormBuilder,
    private dbs: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: { data: Contacto; edit: boolean }
  ) {}

  ngOnInit(): void {
    if (this.data.edit) {
      this.contactForm = this.fb.group({
        idContacto: this.data.data.id,
        nombre: [
          this.data.data.nombreCompleto.split(' ')[0],
          Validators.required,
        ],
        apellidoPaterno: [
          this.data.data.nombreCompleto.split(' ')[1],
          Validators.required,
        ],
        apellidoMaterno: [
          this.data.data.nombreCompleto.split(' ')[2],
          Validators.required,
        ],
        paisNacimiento: 'Perú',
        estadoCivil: 'Casado',
        sexo: 'M',
      });
    } else {
      this.contactForm = this.fb.group({
        idContacto: 0,
        nombre: ['', Validators.required],
        apellidoPaterno: [null, Validators.required],
        apellidoMaterno: [null, Validators.required],
        paisNacimiento: 'Perú',
        estadoCivil: 'Casado',
        sexo: 'M',
      });
    }
  }

  onSubmitForm() {
    this.loading = true;
    this.contactForm.markAsPending();
    this.contactForm.disable();
    console.log(this.contactForm.value);

    const data =JSON.stringify(this.contactForm.value);
    if (this.data.edit) {
      this.dbs.editarContacto(data).subscribe(
        (response: any) => {
          console.log(response);
          this.loading = false;
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.dbs.crearContacto(data).subscribe(
        (response: any) => {
          console.log(response);
          this.loading = false;
          this.dialogRef.close(true);
        },
        (error) => {
          this.dialogRef.close(false);
          console.log(error);
        }
      );
    }
  }
}
