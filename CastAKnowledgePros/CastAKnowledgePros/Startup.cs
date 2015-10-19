using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CastAKnowledgePros.Startup))]
namespace CastAKnowledgePros
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
