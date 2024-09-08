using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
namespace backend.Models;

[Table("users")]
// se puede hacer en una linea?
[Index(nameof(Email), IsUnique = true)]
[Index(nameof(Username), IsUnique = true)]
[Index(nameof(Token), IsUnique = true)]
public class User
{
  [Key]
  [Column("id")]
  public int Id { get; set; }

  [Column("email")]
  [Required]
  public required string Email { get; set; }

  [Column("username")]
  [Required]
  public required string Username { get; set; }

  [Column("password")]
  [Required]
  public required string Password { get; set; }

  [Column("token")]
  [Required]
  public Guid Token { get; set; } = Guid.NewGuid();

  [Column("tweets")]
  public ICollection<Tweet>? Tweets { get; set; }

  [Column("replies")]
  public ICollection<Reply>? Replies { get; set; }

  [Column("createdAt")]
  [Required]
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}