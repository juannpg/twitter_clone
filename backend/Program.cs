using csharp_backend.Extensions;
using Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuration = builder.Configuration;
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseWhen(context =>
  context.Request.Path.Value!.Contains("/replyTweet") ||
  context.Request.Path.Value.Contains("/createTweet"),
  appBuilder =>
  {
    appBuilder.UseVerifyToken();
  }
);

// app.UseHttpsRedirection();
app.UseRouting();
app.MapControllers();

app.Run();