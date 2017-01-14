using System;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Reflection;

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

        //public static bool Exists(dynamic dynamicObject, string property) {
        //    return dynamicObject.GetType().GetProperty(property) != null;
        //}

        public static bool Exists(dynamic dynamicObject, string path)
        {
            JObject jsonObject = JObject.FromObject(dynamicObject);
            return jsonObject.SelectToken(path) != null;
        }
    }
}
