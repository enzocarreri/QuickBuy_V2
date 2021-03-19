using QuickBuy.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Contratos
{
    public interface IUsuarioRepository : IBaseRepositorio<Usuario>
    {
        Usuario Obter(string email, string senha);
    }
}
