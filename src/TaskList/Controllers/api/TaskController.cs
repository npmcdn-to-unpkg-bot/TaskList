using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskList.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskList.Controllers.api
{
    [Route("api/task")]
    public class TaskController : Controller
    {
        private TaskRepository _taskRepo;

        public TaskController(TaskRepository taskRepo) {
            _taskRepo = taskRepo;
        }

        // GET: api/task
        [HttpGet]
        public List<Models.Task> Get()
        {
            return _taskRepo.GetAll().ToList();
        }

        // GET api/task/5
        [HttpGet("{id}")]
        public Models.Task Get(int id)
        {
            return _taskRepo.GetById(id).FirstOrDefault();
        }

        // POST api/task
        [HttpPost]
        public void Post([FromBody]Models.Task task)
        {
            _taskRepo.Add(task);
        }

        // PUT api/task/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/task/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _taskRepo.Delete(id);
        }
    }
}
