using Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TweetsController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public TweetsController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpGet("getTweets")]
  public async Task<ActionResult<IEnumerable<Tweet>>> GetTweets()
  {
    var tweets = await _context.Tweets
      .Select(t => new
      {
        Id = t.Id,
        Content = t.Content,
        Username = t.Username,
        CreatedAt = t.CreatedAt
      })
      .OrderByDescending(t => t.CreatedAt)
      .ToListAsync();

    if (tweets == null)
    {
      return StatusCode(400, new
      {
        Message = "No tweets found"
      });
    }

    return StatusCode(200, new
    {
      Message = "Tweets retrieved successfully",
      Tweets = tweets
    });
  } 

  [HttpPost("createTweet")]
  public async Task<ActionResult<Tweet>> CreateTweet([FromBody] Tweet tweet)
  {
    HttpContext.Items.TryGetValue("username", out var usernameObj);

    tweet.Username = (string)usernameObj!;

    _context.Tweets.Add(tweet);
    await _context.SaveChangesAsync();

    if (tweet == null)
    {
      return StatusCode(400, new
      {
        Message ="Error creating tweet"
      });
    }

    return StatusCode(200, new
    {
      Message = "Tweet created successfully",
      Tweet = tweet
    });
  }
}