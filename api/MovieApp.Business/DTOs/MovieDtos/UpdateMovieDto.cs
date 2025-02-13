using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieApp.Business.DTOs.MovieDtos
{
    public class UpdateMovieDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Photo { get; set; } = string.Empty;
        public bool IsFeatured { get; set; }
        public DateOnly ReleaseDate { get; set; }
    }
}
