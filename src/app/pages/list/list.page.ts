import { Component, OnInit } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { fireDbGallery } from 'src/app/shared/BD/firebase';
import { Preferences } from '@capacitor/preferences';
import { Registro } from 'src/app/shared/interface/registro';

@Component({
  standalone: false,
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  listaMultimedia: Registro[] = [];
  temporizadorRefresco: any;

  constructor() {}

  ngOnInit() {
    this.obtenerMultimedia();
  }
  
  async obtenerMultimedia() {
    try {
      const snapshot = await getDocs(collection(fireDbGallery, 'registros'));
      const resultados = snapshot.docs.map(doc => doc.data() as Registro);

      resultados.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.listaMultimedia = resultados;

      await Preferences.set({
        key: 'media_local',
        value: JSON.stringify(resultados),
      });
    } catch (error) {
      console.error('Error al obtener multimedia:', error);
    }
  }
}
