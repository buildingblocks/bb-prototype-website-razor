using Helpers;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace bb_prototype_website_razor.Extensions
{
    public static class HtmlHelperExtensions
    {
        public static bool Exists(this IHtmlHelper<dynamic> helper, string propertyName)
        {
            return ModelHelper.Exists(helper.ViewData.Model, propertyName);
        }

        public static string If(this IHtmlHelper<dynamic> helper, string propertyName, string output)
        {
            if (ModelHelper.IsBooleanTrue(helper.ViewData.Model, propertyName))
            {
                return output;
            }
            return string.Empty;
        }
    }
}
