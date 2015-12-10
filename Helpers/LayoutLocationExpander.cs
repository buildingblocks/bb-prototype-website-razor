using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc.Razor;

public class LayoutLocationExpander : IViewLocationExpander
  {
    public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
    {

      // Swap /Shared/ for /_Shared/
      return viewLocations.Select(f => f.Replace("/Shared/", "/Layouts/"));

    }

    public void PopulateValues(ViewLocationExpanderContext context)
    {
    }
  }