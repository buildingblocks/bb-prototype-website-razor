using Newtonsoft.Json.Linq;
using System.IO;

namespace Helpers
{
    public static class ModelHelper
    {
        private readonly static string ModelPath = "data/";

        public static dynamic GetModel(string JSONFile)
        {
            return JObject.Parse(File.ReadAllText(ModelPath + JSONFile));
        }

        public static bool Exists(dynamic Object, string property) {
            return Object.GetType().GetProperty(property) != null;
        }
    }
}
