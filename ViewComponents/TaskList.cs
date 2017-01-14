using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace bb_prototype_website_razor.ViewComponents
{

    public class PriorityList : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync(
            int maxPriority, bool isDone)
        {
            GetItemsAsync(maxPriority, isDone);
            return View("~/Views/Components/basic.cshtml");
        }

        private async void GetItemsAsync(int maxPriority, bool isDone)
        {
            await Task.Delay(100);
        }
    }

    public class TodoItem
    {
        
    }
}