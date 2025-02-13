using AutoMapper;
using MovieApp.Business.DTOs;
using MovieApp.Data.Entities;

namespace MovieApp.Business.Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            CreateMap<Actor, ActorInfo>();
            CreateMap<Actor, ActorUpdateInfo>();
            CreateMap<ActorInfo, Actor>();
            CreateMap<ActorUpdateInfo, Actor>();
        }


    }
}
