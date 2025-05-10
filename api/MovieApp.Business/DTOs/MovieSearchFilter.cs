using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieApp.Business.DTOs
{
    public class MovieSearchFilter
    {
        public string? Title { get; set; }
        public DateOnly? ReleaseDateFrom { get; set; }
        public DateOnly? ReleaseDateTo { get; set; }
        public bool? IsFeatured { get; set; }
    }
}
