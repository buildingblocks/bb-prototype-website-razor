using Newtonsoft.Json.Linq;
using System.IO;

namespace Helpers
{
    public static class ModelHelper
    {
        private static readonly string _modelPath = "data/";

        public static dynamic GetModel(string JSONFile)
        {
            return JObject.Parse(File.ReadAllText(_modelPath + JSONFile));
        }

        public static dynamic GetModel(string JSONFile, string path)
        {
            var model = JObject.Parse(File.ReadAllText(_modelPath + JSONFile));
            return model.SelectToken(path);
        }

        public static bool Exists(dynamic dynamicObject, string path)
        {
            JObject jsonObject = JObject.FromObject(dynamicObject);
            return jsonObject.SelectToken(path) != null;
        }

        public static bool IsBooleanTrue(dynamic dynamicObject, string propertyName)
        {
            if (ModelHelper.Exists(dynamicObject, propertyName))
            {
                var property = (bool?) dynamicObject[propertyName];

                return property != null && property.Value;
            }
            return false;
        }
    }
}
