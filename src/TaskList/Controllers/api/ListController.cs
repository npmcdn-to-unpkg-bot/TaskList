using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskList.Repositories;
using TaskList.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskList.Controllers.api
{
    [Route("api/list")]
    public class ListController : Controller
    {
        private ListRepository _listRepo;

        public ListController(ListRepository listRepo)
        {
            _listRepo = listRepo;
        }

        // GET: api/values
        [HttpGet]
        public List<List> Get()
        {
            return _listRepo.GetAll().ToList();
        }

        // GET api/list/5
        [HttpGet("{id}")]
        public List Get(int id)
        {
            return _listRepo.GetById(id);
        }

        // POST api/list
        [HttpPost("name/{name}")]
        public List Post(string name)
        {
            var list = new List() {
                Name = name,
                DateCreated = DateTime.Now,
                IsDeleted = false
            };
           return  _listRepo.Add(list);
        }

        // PUT api/list/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/list/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _listRepo.Delete(id);
        }
    }
}
