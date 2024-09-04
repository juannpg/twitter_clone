using Microsoft.AspNetCore.Builder;
namespace csharp_backend.Extensions;

public static class VerifyTokenExtension
{
  public static IApplicationBuilder UseVerifyToken(this IApplicationBuilder builder)
  {
    return builder.UseMiddleware<Middlewares.VerifyTokenMiddleware>();
  }
}