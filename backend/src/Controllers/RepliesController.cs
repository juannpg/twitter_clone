using Data;
using Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
namespace csharp_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RepliesController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public RepliesController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpPost("replyTweet")]
  public async Task<ActionResult<Reply>> CreateReply([FromBody] Reply reply)
  {
    HttpContext.Items.TryGetValue("username", out var usernameObj);

    reply.Username = (string)usernameObj!;

    _context.Replies.Add(reply);
    await _context.SaveChangesAsync();

    if (reply == null)
    {
      return StatusCode(400, new
      {
        Message ="Error creating reply"
      });
    }

    return StatusCode(200, new
    {
      Message = "Reply created successfully",
      Reply = reply
    });
  }


  [HttpGet("getReplies")]
  public async Task<ActionResult<<IEnumerable<Tweet>>> GetRepliesTweet([FromQuery] string id)
  {
    var idNumber = int.Parse(id);

    var replies = await _context.Replies
      .Where(r => r.TweetId == idNumber)
      .Select(r => new
      {
        Id = r.Id,
        Content = r.Content,
        Username = r.Username,
        CreatedAt = r.CreatedAt
      })
      .OrderByDescending(r => r.CreatedAt)
      .ToListAsync();

    if (replies == null)
    {
      return StatusCode(404, new{
        Message = "replies not found"
      });
    }

    return StatusCode(200, new {
      Message = "replies found",
      Replies = replies
    });
  }
}