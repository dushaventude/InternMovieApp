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
            //CreateMap<Movie,MovieRequestDto>().ReverseMap();
            CreateMap<Movie, UpdateMovieDto>().ReverseMap();


            CreateMap<Actor, ActorInfo>();
            CreateMap<ActorInfo, Actor>();
            CreateMap<CreateActorInfo, Actor>();
            CreateMap<Actor, ActorUpdateInfo>().ReverseMap();
            CreateMap<Actor, ActorInfo>().ReverseMap();
            //if the field names are not the same 
            //   .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FullName)); 

            CreateMap<Movie, MovieInfo>().ReverseMap();
            CreateMap<Movie, MovieDto>().ReverseMap();
            CreateMap<Movie, MovieRequestDto>()
                .ForMember(dest => dest.Actors, opt => opt.MapFrom(src => src.MovieActors.Select(ma => new ActorDto
                {
                    Id = ma.Actor.Id,
                    Name = ma.Actor.Name
                }))).ReverseMap();
        }


    }
}
