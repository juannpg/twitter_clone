using backend.Models;
using Microsoft.EntityFrameworkCore;
namespace Data;

public class ApplicationDbContext : DbContext
{
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
  {
  }

  public DbSet<User> Users { get; set; }
  public DbSet<Tweet> Tweets { get; set; }
  public DbSet<Reply> Replies { get; set; }
  public DbSet<Like> Likes { get; set; }
}
