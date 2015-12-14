using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Newtonsoft.Json.Linq;

namespace Helpers
{
    public static class ModelHelper
    {
        private readonly static string ModelPath = "data/";

        public static dynamic GetModel(string JSONFile)
        {
            return JObject.Parse(File.ReadAllText(ModelPath + JSONFile));
        }

        public static bool Exists(this dynamic Object, string property) {
            return Object.GetType().GetProperty(property) != null;
        }
    }
}
