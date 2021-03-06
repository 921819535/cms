using System.Web.Mvc;
using System.Web.Routing;
using JR.Cms.Conf;
using JR.Cms.Library.CacheProvider;
using JR.Cms.WebImpl.Mvc;
using JR.Cms.WebImpl.Resource;
using JR.Cms.WebImpl.Tasks;
using JR.Stand.Core.AspNet;
using JR.Stand.Core.Web;
using JR.Stand.Core.Web.Cache;

namespace JR.Cms.AspNet
{
    public static class AspNetCmsInitializer
    {
        public static void Init()
        {
            AspNetInitializer.Init();
            Cms.OfficialEnvironment = false;
            // 初始化资源
            SiteResourceInit.Init();
            Cms.ConfigCache(new AspNetCacheWrapper());
            //Cms.OnInit += CmsEventRegister.Init;
            Cms.Init(BootFlag.Normal,null);
            //注册路由;
            Routes.MapRoutes(RouteTable.Routes);
            // 加载插件
            //WebCtx.Current.Plugin.Connect();
            
            //RouteDebug.RouteDebugger.RewriteRoutesForTesting(routes);
            
            //加载自定义插件
            //Cms.Plugins.Extends.LoadFromAssembly(typeof(sp.datapicker.CollectionExtend).Assembly);
            
            //注册定时任务
           // CmsTask.Init();
            
            
            //设置可写权限
            Cms.Utility.SetDirCanWrite("bin");
            Cms.Utility.SetDirCanWrite("templates/");
            Cms.Utility.SetDirCanWrite(CmsVariables.RESOURCE_PATH);
            Cms.Utility.SetDirCanWrite(CmsVariables.FRAMEWORK_PATH);
            Cms.Utility.SetDirCanWrite(CmsVariables.PLUGIN_PATH);
            Cms.Utility.SetDirCanWrite(CmsVariables.TEMP_PATH + "update");
            Cms.Utility.SetDirHidden("config");

        }
    }
}