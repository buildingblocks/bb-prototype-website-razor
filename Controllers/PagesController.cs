using Microsoft.AspNetCore.Mvc;

namespace bb_prototype_website_razor.Controllers
{
    public class PagesController : Controller
    {
        [RouteAttribute("{*url}")]
        public IActionResult Index()
        {
            //Root of the Views folder
            var rootViewsPath = "~/Views/";
            
            //Get the path from the Request
            var path = Request.Path;
            var viewPath = path.Value.ToLower() + ".cshtml";

            //If this is home then map to the Pages
            if (path == "/")
            {
                viewPath = "/pages/index.cshtml";
            }

            //Return the view
            return View(rootViewsPath + viewPath );
        }
    }
}
