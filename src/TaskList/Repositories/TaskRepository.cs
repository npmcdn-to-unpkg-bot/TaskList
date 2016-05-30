using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskList.Models;

namespace TaskList.Repositories
{
    public class TaskRepository
    {
        private TaskListDbContext _context;


        public TaskRepository(TaskListDbContext context)
        {
            _context = context;
        }


        public IQueryable<Models.Task> GetAll()
        {
            return _context.Tasks.Where(x => !x.IsDeleted);
        }

        public IQueryable<Models.Task> GetById(int Id)
        {
            return _context.Tasks.Where(x => x.Id == Id && !x.IsDeleted);
        }

        public IQueryable<Models.Task> GetTasksForList(int listId)
        {
            return _context.Tasks.Where(x => x.ListId == listId && !x.IsDeleted).OrderBy(x => x.DateCreated);
        }

        public void Delete(int id)
        {
            var task = _context.Tasks.Where(x => x.Id == id).FirstOrDefault();
            if (task != null)
            {
                task.IsDeleted = true;
                _context.SaveChanges();
            }
        }

        public Models.Task Add(Models.Task task)
        {

            task.DateCreated = DateTime.Now;

            _context.Tasks.Add(task);
            _context.SaveChanges();
            return task;
        }
    }
}
