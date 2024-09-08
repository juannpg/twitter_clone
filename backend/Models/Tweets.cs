using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
namespace backend.Models;

[Table("tweets")]
public class Tweet
{
  [Key]
  [Column("id")]
  public int Id { get; set; }

  [Column("content")]
  [Required]
  public required string Content { get; set; }

  [Column("username")]
  public string? Username { get; set; }

  [JsonIgnore]
  public User? User { get; set; }

  [Column("createdAt")]
  [Required]
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  [Column("replies")]
  public ICollection<Reply>? Replies { get; set; }
}