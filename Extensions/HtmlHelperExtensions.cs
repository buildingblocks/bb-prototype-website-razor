using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace bb_prototype_website_razor.Extensions
{
    public static class HtmlHelperExtensions
    {
        public static bool Exists(this IHtmlHelper<dynamic> helper, string propertyName)
        {
            return ModelHelper.Exists(helper.ViewData.Model, propertyName);
        }
    }
}
