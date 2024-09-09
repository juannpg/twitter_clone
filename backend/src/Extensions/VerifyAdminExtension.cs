using Microsoft.AspNetCore.Builder;
namespace csharp_backend.Extensions;

public static class VerifyAdminExtension
{
  public static IApplicationBuilder UseVerifyAdmin(this IApplicationBuilder builder)
  {
    return builder.UseMiddleware<Middlewares.VerifyAdminMiddleware>();
  }
}