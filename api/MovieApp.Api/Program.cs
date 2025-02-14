using Microsoft.EntityFrameworkCore;
using MovieApp.Business.Services;
using MovieApp.Data;
using MovieApp.Data.Repositories;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using MovieApp.Business;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddDbContext<MovieDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("MovieDbConnection"));
});

builder.Services.AddScoped<IActorService, ActorService>();
builder.Services.AddScoped<IActorRepository, ActorRepository>();

builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<IMovieRepository, MovieRepository>();




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
