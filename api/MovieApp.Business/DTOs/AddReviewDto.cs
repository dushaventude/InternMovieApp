using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace MovieApp.Business.DTOs
{
    public class AddReviewDto
    {
        [Required]
        public int MovieId { get; set; }

        [MaxLength(255)]
        public string Comment { get; set; }

        [Range(1, 10)]
        public int Rate { get; set; }
    }
}

