using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
namespace backend.Models;

[Table("replies")]
public class Reply
{
  [Key]
  [Column("id")]
  public int Id { get; set; }

  [Column("content")]
  [Required]
  public required string Content { get; set; }

  [Column("tweetId")]
  public int? TweetId { get; set; }

  [JsonIgnore]
  public Tweet? Tweet { get; set; }

  [Column("username")]
  public string? Username { get; set; }

  [JsonIgnore]
  public User? User { get; set; }

  [Column("createdAt")]
  [Required]
  public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}