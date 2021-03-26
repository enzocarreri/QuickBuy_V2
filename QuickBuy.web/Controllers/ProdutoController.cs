using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace QuickBuy.Web.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ProdutoController : Controller
    {
        private readonly IProdutoRepository _produtoRepository;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnviroment;
        public ProdutoController(IProdutoRepository produtoRepository, IHttpContextAccessor httpContextAccessor, IHostingEnvironment hostingEnvironment)
        {
            _produtoRepository = produtoRepository;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnviroment = hostingEnvironment;
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_produtoRepository.ObterTodos());

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult Post([FromBody] Produto p)
        {
            try
            {
                _produtoRepository.Adicionar(p);
                return Created("api/produto", p);
                //return Ok(_produtoRepository.ObterTodos());

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("EnviarArquivo")]
        public IActionResult EnviarArquivo()
        {
            try
            {
                var formFile = _httpContextAccessor.HttpContext.Request.Form.Files["arquivoEnviado"];
                var nomeArquivo = formFile.FileName;
                var extensao = nomeArquivo.Split(".").Last();
                string novoNomeArquivo = GerarNovoNomeArquivo(nomeArquivo, extensao);
                var pastaArquivos = _hostingEnviroment.WebRootPath + "\\arquivos\\";
                var nomeCompleto = pastaArquivos + novoNomeArquivo;

                using (var streamArquivo = new FileStream(nomeCompleto, FileMode.Create))
                {
                    formFile.CopyTo(streamArquivo);
                }

                return Json(novoNomeArquivo);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        private static string GerarNovoNomeArquivo(string nomeArquivo, string extensao)
        {
            var arrayNomeCompacto = Path.GetFileNameWithoutExtension(nomeArquivo).Take(10).ToArray();
            var novoNomeArquivo = new string(arrayNomeCompacto).Replace(" ", "-");
            novoNomeArquivo = $"{novoNomeArquivo}_{DateTime.Now.Year}{DateTime.Now.Month}{DateTime.Now.Day}{DateTime.Now.Hour}{DateTime.Now.Minute}{DateTime.Now.Second}.{extensao}";
            return novoNomeArquivo;
        }

    }

}
