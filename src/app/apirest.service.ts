import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = [];
  datos : any
  private apiURL = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) { }

  // metodo para leer 
  getUsers()
  {
    this.listado = []
    let url = this.apiURL + "users";
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: []) =>{
        resolve(data);
        data.forEach(item => {this.listado.push(item)});
        //console.table(this.listado);
      },
      error =>
      {
        console.log("No se puede conectar");
      })
    })
  }
  async getUser(id:String)
  {
    let url = this.apiURL + "users/" + id;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: any) =>{
        resolve(data);
        this.datos = data;
      },
      error =>
      {
        console.log("No se puede conectar");
      })
    })
  }

  async getPost(id:String)
  {
    this.listado = []
    let url = this.apiURL + "users/"+ id +"/posts";
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: []) =>{
        resolve(data);
        data.forEach(item => {this.listado.push(item)});
        //console.table(this.listado);
      },
      error =>
      {
        console.log("No se puede conectar");
      })
    })
  }

  async getComm(id:String)
  {
    this.listado = []
    let url = this.apiURL + "comments?postId="+ id;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data: []) =>{
        resolve(data);
        data.forEach(item => {this.listado.push(item)});
        //console.table(this.listado);
      },
      error =>
      {
        console.log("No se puede conectar");
      })
    })
  }
}
