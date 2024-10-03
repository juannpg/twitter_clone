using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
namespace backend.Models;

[Table("likes")]
public class Like
{
  [Key]
  [Column("id")]
  public int Id { get; set; }

  [Column("tweetId")]
  [Required]
  public required int TweetId { get; set; }

  [JsonIgnore]
  public Tweet? Tweet { get; set; }
}