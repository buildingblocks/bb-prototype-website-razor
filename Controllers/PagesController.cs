using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace bb_prototype_website_razor.Controllers
{
    public class PagesController : Controller
    {
        public IActionResult Index()
        {
            return View("~/Views/Pages/Index.cshtml");
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
