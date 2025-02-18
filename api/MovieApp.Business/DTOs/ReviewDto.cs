using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MovieApp.Business.DTOs
{
    public class ReviewDto
    {
        public int Id { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string UserId { get; set; }
        public int MovieId { get; set; }
        public string Comment { get; set; }
        public int Rate { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }  // User's First Name
        public string LastName { get; set; }   // User's Last Name
        public DateTime CreatedDatetime { get; set; }
    }
}

