import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from "../environments/environment.development";

import {Router} from "@angular/router";

import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;

  constructor( private messageService: MessageService, private router: Router) { 
    this.socket = io(environment.urlWebSocket);
    this.connect(); 
  }

  public connect(): void { 

    this.socket.on('connect', () => { 
      console.log(`Conectado WebSocket: ${this.socket.id}`);
      this.notificacion();
    });
  }

  noticiaCreada(noticia: any): void { 
    this.socket.emit('noticiaNueva', noticia); 
  }


  public notificacion(): void {
    this.socket.on('enviarNoticiaNueva', (noticia: any) => { 
      this.messageService.add({
        key: 'mensaje',
        severity: 'success',
        summary: 'Noticia nueva',
        detail: `Tienes una nueva noticia: ${noticia.nombre}`
      })
    });
  }

}