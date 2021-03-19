import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioServico } from '../../servicos/usuario/usuario.servico';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]

})
export class LoginComponent implements OnInit {
  public usuario;
  public returnUrl: string;
  public mensagem: string;
  private ativa_spiner: boolean;
  //public usuarioAutenticado: boolean;

  constructor(private router: Router, private activatedRouter: ActivatedRoute,
    private usuarioServico: UsuarioServico) {
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRouter.snapshot.queryParams["returnUrl"];
    this.usuario = new Usuario();
  }


  //public campoBinding = "lala";
  //public email = "";
  //public senha = "";
 // public enderecoImagem = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRatBBJwolNFbslFjukXg_701Ml5au0HJwBtw&usqp=CAU";
 // public titulo = "Titulo component";
  //entrar() {
  //  alert(this.email + " - " + this.senha);
  // }
  entrar() {
    this.ativa_spiner = true;
    this.usuarioServico.vereficaUsuario(this.usuario)
      .subscribe(
        usuario_json => {
          //executado sem erros
          this.usuarioServico.usuario = usuario_json;
          //var usuarioRetorno = data;
          //sessionStorage.setItem("usuario-autenticado", "1")
         // sessionStorage.setItem("email-usuario", usuarioRetorno.email);

          if (this.returnUrl == null) {
            this.router.navigate(["/"]);
          }
          else {
            this.router.navigate([this.returnUrl]);
          }
        },
        err => {
          this.mensagem = err.error;
          this.ativa_spiner = false;
        }
      );

    /* if (this.usuario.email == "a" && this.usuario.senha == "a")
     {
       sessionStorage.setItem("usuario-autenticado", "1");
       
       if (this.returnUrl == null) {
         this.router.navigate(["/"]);
       }
       else {
         this.router.navigate([this.returnUrl]);
       }
       
       //this.usuarioAutenticado = true;
       //alert(this.usuario.email + " - " + this.usuario.senha);
     }*/
  }

}
