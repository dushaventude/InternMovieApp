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

            CreateMap<Movie,CreateMovieDto>().ReverseMap();
            CreateMap<Movie, UpdateMovieDto>().ReverseMap();


            CreateMap<Actor, ActorInfo>();
            CreateMap<ActorInfo, Actor>();
            CreateMap<CreateActorInfo, Actor>();


        }
    }
}
