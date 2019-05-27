using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using Umbraco.Web.Mvc;
using Umbraco.Web.WebApi;

namespace MemberLogin.Core.Controllers
{
    /// <summary>
    /// Implement the MemberLoginApiController
    /// </summary>
    [PluginController("MemberLogin")]
    public class MemberLoginApiController : UmbracoAuthorizedApiController
    {
        /// <summary>
        /// Ctor
        /// </summary>
        public MemberLoginApiController() { }

        /// <summary>
        /// Do Login
        /// </summary>
        [HttpPost]
        public void DoLogin([FromBody]int member)
        {
            // Get the member using the id
            var _member = Services.MemberService.GetById(member);

            // Only do the login when we have a member
            if (_member != null)
                FormsAuthentication.SetAuthCookie(_member.Username, false);
        }
    }
}