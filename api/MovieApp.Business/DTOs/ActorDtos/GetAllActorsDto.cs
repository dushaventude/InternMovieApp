using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieApp.Business.DTOs.ActorDtos
{
    public class GetAllActorsDto
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public List<ActorInfo> Response { get; set; } = new List<ActorInfo>();
    }
}
