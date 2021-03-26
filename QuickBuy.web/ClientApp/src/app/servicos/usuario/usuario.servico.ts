import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario } from "../../model/usuario";

@Injectable({
  providedIn: "root"
})
export class UsuarioServico {
  private baseUrl: string;
  private _usuario: Usuario;

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  set usuario(usuario: Usuario) {
    sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario));
    this._usuario = usuario;
  }

  get usuario(): Usuario {
    let usuario_json = sessionStorage.getItem("usuario-autenticado");
    this._usuario = JSON.parse(usuario_json);
    console.log(this._usuario);
    return this._usuario;

  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public usuario_autenticado(): boolean {
    return this._usuario != null && this.usuario.email != "" && this._usuario.senha != "";
  }

  public limpar_sessao() {
    sessionStorage.setItem("usuario-autenticado", "");
    this._usuario = null;
  }

 

  public vereficaUsuario(usuario: Usuario): Observable<Usuario> {

    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      email: usuario.email,
      senha: usuario.senha
    }
    //raiz do site this.baseUrl
    return this.http.post<Usuario>(this.baseUrl + "api/usuario/VerificaUsuario", body, { headers });
  }

  public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders().set('content-type', 'application/json');  

    return this.http.post<Usuario>(this.baseUrl + "api/usuario", JSON.stringify(usuario), { headers: this.headers });
  }
}

