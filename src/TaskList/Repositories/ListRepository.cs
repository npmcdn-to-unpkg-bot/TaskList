using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskList.Models;

namespace TaskList.Repositories
{
    public class ListRepository
    {
        private TaskListDbContext _context;

        public ListRepository(TaskListDbContext context)
        {
            _context = context;
        }
        public List<List> GetAll()
        {
            var lists =  _context.Lists.Where(x => !x.IsDeleted).Include(x => x.Tasks).ToList();

           foreach(var l in lists)
            {
                l.Tasks = l.Tasks.Where(x => !x.IsDeleted).ToList();
            }

            return lists;
        }

        public List GetById(int Id)
        {
            var list =  _context.Lists.Where(x => x.Id == Id && !x.IsDeleted).Include(x => x.Tasks).FirstOrDefault();

            list.Tasks = list.Tasks.Where(x => !x.IsDeleted).ToList();

            return list;
        }

        public void Add(List list)
        {
           
                list.DateCreated = DateTime.Now;
            

            _context.Lists.Add(list);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var list = _context.Lists.Where(x => x.Id == id).FirstOrDefault();
            if(list != null)
            {
                list.IsDeleted = true;
            }
            _context.SaveChanges();
        }
    }
}
