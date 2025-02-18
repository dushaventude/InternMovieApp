using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieApp.Business.DTOs.MovieDtos
{
    public class GetAllMoviesDto
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public List<MovieInfo> Response { get; set; } = new List<MovieInfo>();
    }
}
