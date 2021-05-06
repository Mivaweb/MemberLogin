using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core.Composing;
using Umbraco.Web.Trees;

namespace MemberLogin.Core.Startup
{
    public class MemberLoginComponent : IComponent
    {
        public void Initialize()
        {
            TreeControllerBase.MenuRendering += MemberLogin_MenuRendering;
        }

        private void MemberLogin_MenuRendering(TreeControllerBase sender, MenuRenderingEventArgs e)
        {
            // If we are not on the members tree, just return
            if (sender.TreeAlias != "member") return;

            string actionView = VirtualPathUtility.ToAbsolute("~/App_Plugins/MemberLogin/views/memberlogin.html");

            var menuItem = new Umbraco.Web.Models.Trees.MenuItem("memberLogin", "Impersonate Member");
            menuItem.Icon = "client";
            menuItem.AdditionalData.Add("memberId", e.NodeId);
            menuItem.AdditionalData.Add("actionView", actionView);
            menuItem.SeparatorBefore = false;

            e.Menu.Items.Insert(e.Menu.Items.Count, menuItem);
        }

        public void Terminate()
        {
            
        }
    }
}