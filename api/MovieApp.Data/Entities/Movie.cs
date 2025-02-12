using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieApp.Data.Entities
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Photo { get; set; }
        public bool IsFeatured { get; set; } = false;
        public DateOnly? ReleaseDate { get; set; } 


    }
}
