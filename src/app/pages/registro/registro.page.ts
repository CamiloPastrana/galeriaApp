import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MediaService } from 'src/app/shared/media/media.service';

@Component({
  standalone: false,
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  texto: string = '';
  urlImagen: string = '';
  imagenBase64: string | null = null;

  constructor(
    private mediaService: MediaService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController
  ) {}

  async capturarYRegistrar() {
    if (!this.texto || !this.urlImagen) {
      alert("Completa todos los campos.");
      return;
    }

    try {
      await this.mediaService.guardarEntrada(this.texto, this.urlImagen);
      alert("Guardado con éxito.");
      this.texto = '';
      this.urlImagen = '';
      this.imagenBase64 = null;
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Ocurrió un error.");
    }
  }

  async elegirImagen() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccionar imagen',
      buttons: [
        {
          text: 'Tomar foto',
          icon: 'camera',
          handler: () => this.tomarFoto()
        },
        {
          text: 'Elegir de galería',
          icon: 'image',
          handler: () => this.abrirGaleria()
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async tomarFoto() {
    try {
      const imagen = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      const base64 = imagen.base64String!;
      this.imagenBase64 = `data:image/jpeg;base64,${base64}`;
      const url = await this.mediaService.subirImagen(base64);
      if (url) this.urlImagen = url;
    } catch (error) {
      console.error('Error al tomar foto', error);
    }
  }

  abrirGaleria() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async () => {
      const archivo = input.files?.[0];
      if (!archivo) return;

      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        this.imagenBase64 = `data:image/jpeg;base64,${base64}`;
        const url = await this.mediaService.subirImagen(base64);
        if (url) this.urlImagen = url;
      };
      reader.readAsDataURL(archivo);
    };

    input.click();
  }

  irAGaleria() {
    this.router.navigate(['/list']);
  }
}
