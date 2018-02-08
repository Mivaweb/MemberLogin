using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
using Umbraco.Web.Trees;

namespace MemberLogin
{
    /// <summary>
    /// MemberLogin Bootstrapper to handle Umbraco startup events
    /// </summary>
    public class Bootstrapper : ApplicationEventHandler
    {
        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            TreeControllerBase.MenuRendering += MemberLogin_MenuRendering;
        }

        private void MemberLogin_MenuRendering(TreeControllerBase sender, MenuRenderingEventArgs e)
        {
            // If we are not on the members tree, just return
            if (sender.TreeAlias != "member") return;

            var menuItem = new Umbraco.Web.Models.Trees.MenuItem("memberLogin", "Impersonate Member");
            menuItem.Icon = "client";
            menuItem.AdditionalData.Add("memberId", e.NodeId);
            menuItem.AdditionalData.Add("actionView", "/App_Plugins/MemberLogin/views/memberlogin.html");
            menuItem.SeperatorBefore = false;

            e.Menu.Items.Insert(e.Menu.Items.Count, menuItem);
        }
    }
}