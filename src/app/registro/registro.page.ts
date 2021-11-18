import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

// importa el servicio
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private crud: CrudService,
              private toastController: ToastController,
              private alertController: AlertController,
              ) { }
  nombre1 = "";
  fono1 = "";
  rut1 = "";
  listado = [];
  ngOnInit() {
    /*
    this.crud.set("Patrick Star");

    const valor = this.crud.get("1");
    valor.then(x => console.log(x));
    */
  }

  async agregar(rut: HTMLInputElement, nombre: HTMLInputElement, fono: HTMLInputElement)
  {
    // Ejercicio: validar que los input tengan datos
    if(rut.value.trim().length == 0)
    {
      const toast = await this.toastController.create({
        message: 'Debe especificar el rut' ,
        duration: 3000,
        color: "danger",
        position: "middle"
      });
      toast.present();
    }
    else if(nombre.value.trim().length == 0)
    {
      const toast = await this.toastController.create({
        message: 'Debe especificar el nombre' ,
        duration: 3000,
        color: "danger",
        position: "middle"
      });
      toast.present();
    }
    else if(fono.value.trim().length == 0)
    {
      const toast = await this.toastController.create({
        message: 'Debe especificar el fono' ,
        duration: 3000,
        color: "danger",
        position: "middle"
      });
      toast.present();
    }
    else
    {
      const datos = [{"rut" : rut.value, "nombre": nombre.value, "fono": fono.value}];
      // Ejercicio: Preguntar al usuario si quiere realizar el cambio
      // permite saber si existe el rut o no (key)
      const valor = await this.crud.get(rut.value);
  
      if(valor != null && valor.length > 0) // permite saber que existe el rut
      {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Registro existente',
          message: '<strong>¿Está seguro de cambiar los datos?</strong>!!!',
          buttons: [
            {
              text: 'No',
              role: 'cancel'
            }, 
            {
              text: 'Si',
              handler: () => {
                this.crud.set(datos);
                rut.value= "";
                nombre.value="";
                fono.value="";
                this.nombre1 = "";
                this.fono1 = "";
                this.listado = [];
              }
            }
          ]
        });
    
        await alert.present();
      }
      else
      {
        this.crud.set(datos);
        rut.value= "";
        nombre.value="";
        fono.value="";
        this.nombre1 = "";
        this.fono1 = "";
        this.listado = [];
  
        const toast = await this.toastController.create({
          message: 'Los datos fueron guardados' ,
          duration: 3000,
          color: "success",
          position: "middle"
        });
        toast.present(); 
      }

    }
  }
  async buscar(rut: HTMLInputElement)
  {
    if(rut.value.trim().length == 0)
    {
      const toast = await this.toastController.create({
        message: 'No especifico el rut' ,
        duration: 3000,
        color: "danger",
        position: "middle"
      });
      this.nombre1 = "";
      toast.present(); 
    }
    else
    {
      // Ejericicio: alidar y avisar al usuario que el rut no existe
      const valor = await this.crud.get(rut.value);
      //console.log(valor); // null si no esta el rut
      if (valor == null)
      {
        const toast = await this.toastController.create({
          message: 'El rut especificado no existe' ,
          duration: 3000,
          color: "warning",
          position: "middle"
        });
        this.nombre1 = "";
        toast.present(); 
      }
      else
      {
        this.nombre1 = valor[0].nombre;
        this.fono1 = valor[0].fono;
        this.rut1 = rut.value;
        rut.value = "";
        this.listado = []; // limpiar la lista si esta expuesta o si se ve.
      }
    }
  }

  listar()
  {
    this.listado = this.crud.listar();
    this.nombre1 = ""; // limpia la vista si estan los datos puestos
    this.fono1 = "";    
  }
  async eliminar()
  {
    if(this.rut1 != "")
    {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Registro para eliminar',
        message: '<strong>¿Está seguro de eliminar los datos?</strong>!!!',
        buttons: [
          {
            text: 'No',
            role: 'cancel'
          }, 
          {
            text: 'Si',
            handler: async () => {
              this.crud.eliminar(this.rut1);
              this.rut1 = "";
              this.nombre1 = ""; // limpia la vista si estan los datos puestos
              this.fono1 = "";  
              const toast = await this.toastController.create({
                message: 'El dato fue eliminado',
                duration: 3000,
                color: "danger",
                position: "middle"
              });
              toast.present();  
            }
          }
        ]
      });  
      await alert.present();      
    }
  }
  limpiar(rut: HTMLInputElement, nombre: HTMLInputElement, fono: HTMLInputElement)
  {
    //Ejercicios:
    // Limpiar los txt tambien
    this.listado = [];
    this.nombre1 = "";
    this.rut1 = "";
    this.fono1 = "";
    rut.value= "";
    nombre.value="";
    fono.value="";
  }
}
