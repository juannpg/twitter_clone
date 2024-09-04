using Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace csharp_backend.Middlewares;

public class VerifyTokenMiddleware
{
  private readonly RequestDelegate _next;
  private readonly IServiceScopeFactory _scopeFactory;

  public VerifyTokenMiddleware(RequestDelegate next, IServiceScopeFactory scopeFactory)
  {
    _next = next;
    _scopeFactory = scopeFactory;
  }

  public async Task InvokeAsync(HttpContext context)
  {
    using (var scope = _scopeFactory.CreateScope())
    {
      var _context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

      var tokenHeader = context.Request.Headers["Authorization"].ToString().Split(" ")[1];
      Guid.TryParse(tokenHeader, out var token);

      var user = await _context.Users
        .Where(u => u.Token == token)
        .Select(u => new
        {
          Username = u.Username,
        })
        .FirstOrDefaultAsync();

      if (user == null)
      {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsync("Invalid token");
        return;
      }

      context.Items["username"] = user.Username;
    }

    await _next(context);
  }
}