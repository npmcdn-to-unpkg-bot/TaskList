using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskList.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDeleted { get; set; }
        public int ListId { get; set; }
        public bool IsCompleted { get; set; }
    }
}
