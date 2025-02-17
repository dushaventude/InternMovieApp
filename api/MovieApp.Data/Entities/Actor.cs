using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MovieApp.Data.Entities
{
    public class Actor
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public string? Gender { get; set; }
        public string? Country { get; set; }
        public List<MovieActor> MovieActors { get; set; } = new List<MovieActor>();

    }

}
