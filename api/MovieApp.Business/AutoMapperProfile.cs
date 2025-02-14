using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MovieApp.Business.DTOs;

using MovieApp.Business.DTOs.MovieDtos;

using MovieApp.Data.Entities;

namespace MovieApp.Business
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Movie,MovieRequestDto>().ReverseMap();
            CreateMap<Movie, UpdateMovieDto>().ReverseMap();
            CreateMap<Movie, MovieDto>().ReverseMap();
        }
    }
}
