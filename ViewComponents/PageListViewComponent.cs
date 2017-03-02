using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace bb_prototype_website_razor.Controllers
{
    public class PageListViewComponent : ViewComponent
    {
        private static readonly string _modelPath = "data/";

        public IViewComponentResult Invoke(string listingFile)
        {
            var pages = JsonConvert.DeserializeObject<List<PageListing>>(File.ReadAllText(_modelPath + listingFile));

            return View("~/Views/Components/_bb/pageList.cshtml", pages);
        }
    }
}
