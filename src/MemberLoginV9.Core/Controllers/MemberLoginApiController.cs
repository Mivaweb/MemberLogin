using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;
using Umbraco.Cms.Web.Common.Security;

namespace MemberLoginV9.Core.Controllers
{
    /// <summary>
    /// Implement the MemberLoginApiController
    /// </summary>
    [PluginController("MemberLogin")]
    public class MemberLoginApiController : UmbracoAuthorizedApiController
    {
        private readonly IMemberManager _memberManager;
        private readonly IMemberSignInManager _memberSignInManager;
        /// <summary>
        /// Ctor
        /// </summary>
        public MemberLoginApiController(IMemberSignInManager memberSignInManager, IMemberManager memberManager)
        {
            _memberSignInManager = memberSignInManager;
            _memberManager = memberManager;
        }

        /// <summary>
        /// Do Login
        /// </summary>
        [HttpPost]
        public async Task DoLogin([FromBody] string memberId)
        {
            // Get the member using the id
            var member = await _memberManager.FindByIdAsync(memberId);

            // Only do the login when we have a member
            if (member != null)
                await _memberSignInManager.SignInAsync(member, false);
        }
    }
}