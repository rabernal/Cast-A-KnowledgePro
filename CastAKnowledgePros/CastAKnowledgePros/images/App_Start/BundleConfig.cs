﻿using System.Web;
using System.Web.Optimization;

namespace CastAKnowledgePros
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*",
                        "~/Scripts/jquery.validate.unobtrusive.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/mySelection").Include(
                        "~/Scripts/jquery.fs.wallpaper.min.js",
                        "~/Scripts/classie.js",
                        "~/Scripts/jquery.easing.1.3.js",
                        "~/Scripts/wow.min.js",
                        "~/Scripts/jquery.nanogallery.min.js",
                        "~/Scripts/scrolling.js",
                        "~/Scripts/jquery.stellar.js",
                        "~/Scripts/respond.js",
                        "~/Scripts/cbpAnimatedHeader.js",
                        "~/Scripts/nav.js",
                        "~/Scripts/displayVideos.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/bootstrap.min.js"));





            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",

                      //"~/Content/main.css",
                      "~/Content/PagedList.css",
                      "~/Content/animate.css",
                      "~/Content/font-awesome.min.css",
                      "~/Content/jquery.fs.wallpaper.css",
                      //"~/Content/site.css",
                      //"~/Content/nav.css",
                      "~/Content/app.css",
                      "~/Content/nanogallery.min.css"));
        }
    }
}
