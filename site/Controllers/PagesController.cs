using Microsoft.AspNetCore.Mvc;

namespace bb_prototype_website_razor.Controllers
{
    public class PagesController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/Index.cshtml");
        }

        public IActionResult LayoutA()
        {
            return View();
        }

        public IActionResult LayoutB()
        {
            return View();
        }

        public IActionResult Grid()
        {
            return View();
        }

        public IActionResult Styleguide()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
