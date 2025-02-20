using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieApp.Data.Entities
{
    public class MoviePhoto
    {
        public int Id { get; set; }
        public string Url { get; set; }  
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
    }
}
