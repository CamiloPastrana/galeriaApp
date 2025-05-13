import { Injectable } from '@angular/core';
import { collection, addDoc } from 'firebase/firestore';
import { fireDbGallery } from '../BD/firebase';
import { supabase } from '../BD/supabase';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  async subirImagen(base64: string): Promise<string | null> {
    const nombre = `foto_${Date.now()}.jpg`;
    const { error } = await supabase.storage
      .from('images')
      .upload(nombre, this.base64ToBlob(base64), {
        contentType: 'image/jpeg',
        upsert: false,
      });

    if (error) {
      console.error('Error al subir imagen:', error.message);
      return null;
    }

    const result = supabase.storage.from('images').getPublicUrl(nombre);
    return result.data.publicUrl;
  }

  async guardarEntrada(texto: string, url: string): Promise<void> {
  const datos = {
    texto,
    urlImagen: url,           // ✔ nombre correcto
    createdAt: new Date().toISOString() // ✔ nombre correcto
  };
  await addDoc(collection(fireDbGallery, 'registros'), datos);
}


  private base64ToBlob(base64: string): Blob {
    const chars = atob(base64);
    const bytes = new Uint8Array([...chars].map(c => c.charCodeAt(0)));
    return new Blob([bytes], { type: 'image/jpeg' });
  }
}
