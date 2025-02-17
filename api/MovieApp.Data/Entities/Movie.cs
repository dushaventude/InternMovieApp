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
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Photo { get; set; } = string.Empty;
        public bool IsFeatured { get; set; }
        public DateOnly ReleaseDate { get; set; }
        public List<MovieActor> MovieActors { get; set; } = new List<MovieActor>();
    }
}
