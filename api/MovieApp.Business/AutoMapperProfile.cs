using AutoMapper;
using MovieApp.Business.DTOs;
using MovieApp.Data.Entities;

namespace MovieApp.Business
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            CreateMap<Actor, ActorInfo>().ReverseMap();
            CreateMap<Actor, ActorUpdateInfo>().ReverseMap();
        }


    }
}
