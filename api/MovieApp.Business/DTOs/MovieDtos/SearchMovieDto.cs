using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieApp.Business.DTOs.MovieDtos
{
    public class SearchMovieDto
    {
        public string? SearchQuery { get; set; }
        public bool IsFeatured { get; set; }
    }
}
