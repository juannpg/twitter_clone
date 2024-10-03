using Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LikesController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public LikesController(ApplicationDbContext context)
  {
    _context = context;
  }

  public class LikeDto {
    public required int TweetId { get; set; }
  }

  [HttpPost("likeTweet")]
  public async Task<ActionResult<Like>> CreateLike([FromBody] LikeDto likeDto)
  {
    var tweet = await _context.Tweets
      .Where(t => t.Id == likeDto.TweetId)
      .FirstOrDefaultAsync();

    if (tweet == null)
    {
      return StatusCode(400, new
      {
        Message = "Tweet not found"
      });
    }

    var like = new Like
    {
      TweetId = likeDto.TweetId
    };

    _context.Likes.Add(like);
    await _context.SaveChangesAsync();

    return StatusCode(200, new
    {
      Message = "Like created successfully",
      Like = like
    });
  }
}