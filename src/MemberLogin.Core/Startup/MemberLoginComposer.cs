using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Core.Composing;

namespace MemberLogin.Core.Startup
{
    public class MemberLoginComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            composition.Components().Append<MemberLoginComponent>();
        }
    }
}