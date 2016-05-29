using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskList.Models;
using TaskList.Repositories;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskList.Controllers
{
    [Route("/")]
    public class HomeController : Controller
    {
        private ListRepository _listRepo;

        public HomeController(ListRepository listRepo)
        {
            _listRepo = listRepo;
        }

        // GET: /<controller>/
        public ActionResult Index()
        {
            var lists = _listRepo.GetAll().ToList();




            return View("/Views/Home/Index.cshtml", lists);
        }
    }
}
