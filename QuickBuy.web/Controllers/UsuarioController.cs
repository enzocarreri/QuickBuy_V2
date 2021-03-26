using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[Controller]")]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepository _usuarioRepositorio;
        public UsuarioController(IUsuarioRepository usuarioRepositorio)
        {
            _usuarioRepositorio = usuarioRepositorio;
        }

        [HttpPost]
        public ActionResult Post([FromBody] Usuario usuario)
        {
            try
            {
                var usuarioCad = _usuarioRepositorio.Obter(usuario.Email);
                if (usuarioCad != null)
                {
                    return BadRequest("Usuario já cadastrado no sistema");                   
                }

                _usuarioRepositorio.Adicionar(usuario);

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("VerificaUsuario")]
        public ActionResult VerificaUsario([FromBody] Usuario u)
        {
            try
            {
                var usuarioRet = _usuarioRepositorio.Obter(u.Email,u.Senha);
                if (usuarioRet != null)
                {
                    return Ok(usuarioRet);
                }
                return BadRequest("Usuario ou senha invalidos"); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}