using MemberLoginV9.Core.TreeNotificationHandlers;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;

namespace MemberLoginV9.Core.Composers
{
    public class MemberLoginComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.AddNotificationHandler<MenuRenderingNotification, MemberLoginTreeNotificationHandler>();
        }
    }
}
