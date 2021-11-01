using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace MemberLoginV9.Core.TreeNotificationHandlers
{
    public class MemberLoginTreeNotificationHandler : INotificationHandler<MenuRenderingNotification>
    {
        public MemberLoginTreeNotificationHandler()
        {
        }

        public void Handle(MenuRenderingNotification notification)
        {
            // If we are not on the members tree, just return
            if (notification.TreeAlias != "member") return;

            var menuItem = new Umbraco.Cms.Core.Models.Trees.MenuItem("memberLogin", "Impersonate Member");
            menuItem.AdditionalData.Add("memberId", notification.NodeId);
            menuItem.AdditionalData.Add("actionView", "/App_Plugins/MemberLoginV9/views/memberlogin.html");
            menuItem.Icon = "client";
            menuItem.SeparatorBefore = false;
            notification.Menu.Items.Insert(notification.Menu.Items.Count, menuItem);

        }
    }
}