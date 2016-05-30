using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using TaskList.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace TaskList.Controllers.api
{
    [Route("api/task")]
    public class TaskController : Controller
    {
        private TaskRepository _taskRepo;

        public TaskController(TaskRepository taskRepo)
        {
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

        // POST api/task/name/[name]/listId/[1]
        [HttpPost("name/{name}/listId/{listId}")]
        public Models.Task Post(string name, int listId)
        {
            var task = new Models.Task()
            {
                Name = name,
                DateCreated = DateTime.Now,
                IsDeleted = false,
                ListId = listId
            };
            return _taskRepo.Add(task);

        }

        // PUT api/task/5
        [HttpPut]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/task/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _taskRepo.Delete(id);
        }

        [HttpPut("complete/{id}")]
        public void CompleteTask(int id)
        {
            _taskRepo.Complete(id);
        }

        [HttpPut("uncomplete/{id}")]
        public void UnCompleteTask(int id)
        {
            _taskRepo.UnComplete(id);
        }
    }
}
