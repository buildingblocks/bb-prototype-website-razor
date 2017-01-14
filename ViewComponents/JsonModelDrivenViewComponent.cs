using System.Threading.Tasks;
using Helpers;
using Microsoft.AspNetCore.Mvc;

namespace bb_prototype_website_razor.Controllers
{
    public class JsonModelDrivenViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(string viewName, string componentPath)
        {
            string componentFile = $"{componentPath.Split('.')[0]}.json";
            string path = componentPath.Split('.')[1];
            var model = ModelHelper.GetModel(componentFile, path);
            return View(viewName, model);
        }
    }
}
