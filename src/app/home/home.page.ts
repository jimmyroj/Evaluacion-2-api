import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {ApirestService } from '../apirest.service';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  listado = [];
  datos : any;
  constructor(public toastController: ToastController,
              public alertController: AlertController,
              private api: ApirestService,
              private activatedRouter : ActivatedRoute,
              private router : Router,
              private crud: CrudService) {}
  ngOnInit() {    
  }
            
  async listar(name: HTMLInputElement,pass: HTMLInputElement)
  { 
    const nom = name.value;
    const pas = pass.value;
    await this.api.getUsers()
    this.listado = this.api.listado
    for(let i = 0;i<this.listado.length; i++){
      if(this.listado[i].username == nom && pas == "1234"){
          this.router.navigateByUrl("/usuarios/" + this.listado[i].id);
      }
      else if(name.value.trim().length == 0)
    {
      const toast = await this.toastController.create({
        message: 'Debe especificar el usuario' ,
        duration: 3000,
        color: "warning",
        position: "bottom"
      });
      toast.present();
    }
    else if(pas.trim().length == 0)
    {
      const toast = await this.toastController.create({
        message: 'Debe especificar la Contraseña' ,
        duration: 3000,
        color: "warning",
        position: "bottom"
      });
      toast.present();
    }
    else if(pas.toString() != "1234")
    {
      const toast = await this.toastController.create({
        message: 'Contraseña incorrecta' ,
        duration: 3000,
        color: "warning",
        position: "bottom"
      });
      toast.present();
    }
    }
  }
  // ejercicios: Permitir al usuario limpiar el 
  // localStorage. Solicitar la confirmación de esta
  // acción. 
  // Deben usar el icono "basurero" y debe aparecer
  // abajo en centro de la pantalla
}
