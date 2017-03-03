using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace bb_prototype_website_razor.Controllers
{
    public class ApiController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public ApiController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [RouteAttribute("api/{id}")]
        public JsonResult Index()
        {
            //Get the path from the request
            var path = Request.Path;

            //Get the application root
            string webRootPath = _hostingEnvironment.ContentRootPath;

            //PAth for the root + path will work as route has api in it
            var jsonPath = webRootPath + path.Value.ToLower() + ".json";

            //Get the json object from a file
            var json = JObject.Parse(System.IO.File.ReadAllText(jsonPath));

            return Json(json);
        }
    }
}
