using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieApp.Shared.Models
{
    using System.Collections.Generic;
    using System.Text.Json.Serialization;

    public class ErrorResponse
    {
        [JsonPropertyName("status_code")]
        public int StatusCode { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }

        [JsonPropertyName("errors")]
        public List<string> Errors { get; set; } = new List<string>();
    }
}