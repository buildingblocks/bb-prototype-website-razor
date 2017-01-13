using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;

namespace bb_prototype_website_razor.Controllers
{
    public class PagesController : Controller
    {
        public IActionResult Index()
        {
            var pagePath = "~/Views/";

            var path = Request.Path;

            if (path == "/")
            {
                return View("~/Views/Pages/Index.cshtml");
            }

            return View(pagePath + path.Value.ToLower() + ".cshtml");
        }
    }
}
