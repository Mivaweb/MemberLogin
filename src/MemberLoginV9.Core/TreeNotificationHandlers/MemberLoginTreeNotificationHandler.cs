using System.Linq;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Security;
using Umbraco.Extensions;

namespace MemberLoginV9.Core.TreeNotificationHandlers
{
    public class MemberLoginTreeNotificationHandler : INotificationHandler<MenuRenderingNotification>
    {
        private readonly IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;

        public MemberLoginTreeNotificationHandler(IBackOfficeSecurityAccessor backOfficeSecurityAccessor)
        {
            _backOfficeSecurityAccessor = backOfficeSecurityAccessor;
        }

        public void Handle(MenuRenderingNotification notification)
        {
            if (notification.TreeAlias.Equals("member") &&
                _backOfficeSecurityAccessor.BackOfficeSecurity.CurrentUser.Groups.Any(x =>
                    x.Alias.InvariantEquals("admin")))
            {
                var menuItem = new Umbraco.Cms.Core.Models.Trees.MenuItem("memberLogin", "Impersonate Member");
                menuItem.AdditionalData.Add("memberId", notification.NodeId);
                menuItem.AdditionalData.Add("actionView", "/App_Plugins/MemberLogin/views/memberlogin.html");
                menuItem.Icon = "client";
                menuItem.SeparatorBefore = false;
                notification.Menu.Items.Insert(notification.Menu.Items.Count, menuItem);
            }
        }
    }
}