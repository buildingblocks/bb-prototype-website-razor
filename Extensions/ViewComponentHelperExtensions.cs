using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bb_prototype_website_razor.Controllers;
using Helpers;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace bb_prototype_website_razor.Extensions
{
    public static class ViewComponentHelperExtensions
    {
        public static IHtmlContent Render(this IViewComponentHelper helper, string viewName, string componentPath)
        {
            return helper.InvokeAsync(typeof(JsonModelDrivenViewComponent), new { viewName, componentPath }).Result;
        }
    }
}
