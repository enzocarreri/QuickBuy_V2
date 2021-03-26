using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using QuickBuy.Repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace QuickBuy.Repositorio.Repositorios
{
    public class UsuarioRepositorio : BaseRepositorio<Usuario>, IUsuarioRepository
    {
        public UsuarioRepositorio(QuickBuyContexto quickBuyContexto) : base(quickBuyContexto)
        {

        }

        public Usuario Obter(string email, string senha)
        {
            return QuickBuyContexto.Usuarios.FirstOrDefault(x=> x.Email== email && x.Senha == senha);
        }
        public Usuario Obter(string email)
        {
            return QuickBuyContexto.Usuarios.FirstOrDefault(x => x.Email == email);
        }
    }
}
