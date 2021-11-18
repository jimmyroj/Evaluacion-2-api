import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {ApirestService } from '../apirest.service';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  listado = []
  constructor(private api: ApirestService,
    private activatedRouter : ActivatedRoute,
    private router : Router,
    private crud: CrudService,
    public toastController: ToastController,
    public alertController: AlertController) { }

  ngOnInit() {
    
  }
  async listar()
  {
    let id ="";
    this.activatedRouter.paramMap.subscribe(async param => {
      id = param.get('id');
    })
    
    await this.api.getPost(id);
    this.listado =  this.api.listado;
    //console.log(this.listado);
  }

  async Cerrar()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',

      message: '<strong>¿Desea cerrar sesion?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, 
        {
          text: 'Si',
          handler: async () => {
            this.listado = []
            localStorage.clear()
            this.router.navigateByUrl("/home");
          }
        }
      ]
    });  
    await alert.present();      
    //console.log(this.listado);
  }
  // ejercicio: agregar los botones para listar.
  // crear un link que permita ver el: id, name, username, email y direccion 
  // de un usuario seleccionado.
}
