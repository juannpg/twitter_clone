using Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public AdminController(ApplicationDbContext context)
  {
    _context = context;
  }

  public class IdDto {
    public required string Id { get; set; }
  }

  [HttpGet("verifyAdmin")]
  public async Task<ActionResult<bool>> VerifyAdmin()
  {
    HttpContext.Items.TryGetValue("token", out var tokenObj);
    var token = (Guid)tokenObj!;

    var user = await _context.Users
      .Where(u => u.Token == token)
      .Select(u => new
      {
        Role = u.Role
      })
      .FirstOrDefaultAsync();
    
    var role = user!.Role.ToString();
    if (role == "Admin")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  [HttpGet("getUsers")]
  public async Task<ActionResult<IEnumerable<User>>> GetUsers()
  {
    var users = await _context.Users
      .Select(u => new
      {
        Id = u.Id,
        Email = u.Email,
        Username = u.Username,
        CreatedAt = u.CreatedAt
      })
      .OrderByDescending(u => u.CreatedAt)
      .ToListAsync();

    if (users == null)
    {
      return StatusCode(400, new
      {
        Message = "No users found"
      });
    }

    return StatusCode(200, new
    {
      Message = "Users retrieved successfully",
      Users = users
    });
  }

  [HttpDelete("deleteUser")]
  public async Task<ActionResult<User>> DeleteUser([FromBody] IdDto idDto)
  {
    var idNumber = int.Parse(idDto.Id);

    var userToDelete = await _context.Users
      .Where(u => u.Id == idNumber)
      .FirstOrDefaultAsync();

    if (userToDelete == null)
    {
      return StatusCode(400, new
      {
        Message = "User not found"
      });
    }
    
    _context.Users.Remove(userToDelete);
    await _context.SaveChangesAsync();

    return StatusCode(200, new
    {
      Message = "User deleted successfully"
    });
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
        CreatedAt = t.CreatedAt,
        Replies = t.Replies
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

  [HttpDelete("deleteTweet")]
  public async Task<ActionResult<Tweet>> DeleteTweet([FromBody] IdDto idDto)
  {
    var idNumber = int.Parse(idDto.Id);

    var tweetToDelete = await _context.Tweets
      .Where(t => t.Id == idNumber)
      .FirstOrDefaultAsync();

    var repliesToDelete = await _context.Replies
      .Where(r => r.TweetId == idNumber)
      .ToListAsync();

    foreach (var reply in repliesToDelete)
    {
      _context.Replies.Remove(reply);
    }

    if (tweetToDelete == null)
    {
      return StatusCode(400, new
      {
        Message = "Tweet not found"
      });
    }
    
    _context.Tweets.Remove(tweetToDelete);
    await _context.SaveChangesAsync();

    return StatusCode(200, new
    {
      Message = "Tweet and replies deleted successfully"
    });
  }

  [HttpGet("getReplies")]
  public async Task<ActionResult<IEnumerable<Reply>>> GetReplies()
  {
    var replies = await _context.Replies
      .Select(r => new
      {
        Id = r.Id,
        Content = r.Content,
        Username = r.Username,
        TweetId = r.TweetId,
        CreatedAt = r.CreatedAt
      })
      .OrderByDescending(r => r.CreatedAt)
      .ToListAsync();

    if (replies == null)
    {
      return StatusCode(400, new
      {
        Message = "No replies found"
      });
    }

    return StatusCode(200, new
    {
      Message = "Replies retrieved successfully",
      Replies = replies
    });
  }

  [HttpDelete("deleteReply")]
  public async Task<ActionResult<Reply>> DeleteReply([FromBody] IdDto idDto)
  {
    var idNumber = int.Parse(idDto.Id);

    var replyToDelete = await _context.Replies
      .Where(r => r.Id == idNumber)
      .FirstOrDefaultAsync();

    if (replyToDelete == null)
    {
      return StatusCode(400, new
      {
        Message = "Reply not found"
      });
    }
    
    _context.Replies.Remove(replyToDelete);
    await _context.SaveChangesAsync();

    return StatusCode(200, new
    {
      Message = "Reply deleted successfully"
    });

  }

  [HttpPut("makeAdmin")]
  public async Task<ActionResult<User>> MakeAdmin([FromBody] IdDto idDto)
  {
    var idNumber = int.Parse(idDto.Id);

    var userToMakeAdmin = await _context.Users
      .Where(u => u.Id == idNumber)
      .FirstOrDefaultAsync();

    if (userToMakeAdmin == null)
    {
      return StatusCode(400, new
      {
        Message = "User not found"
      });
    }

    userToMakeAdmin.Role = (backend.Models.User.ERole)1;
    await _context.SaveChangesAsync();

    return StatusCode(200, new
    {
      Message = "User made admin successfully"
    });
  }
}