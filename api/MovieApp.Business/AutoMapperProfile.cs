using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MovieApp.Business.DTOs;
using MovieApp.Data.Entities;

namespace MovieApp.Business
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Mapping from Actor to ActorInfo
            CreateMap<Actor, ActorInfo>();

            // Mapping from ActorInfo to Actor
            CreateMap<ActorInfo, Actor>();
               
        }
    }
}
