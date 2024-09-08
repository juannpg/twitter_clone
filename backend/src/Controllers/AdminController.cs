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

  public class deleteUserDto {
    public required string Id { get; set; }
  }

  [HttpGet("verifyAdmin")]
  public async Task<ActionResult<bool>> VerifyAdmin()
  {
    HttpContext.Items.TryGetValue("token", out var tokenObj);
    var token = Guid.Parse((string)tokenObj!);

    var user = await _context.Users
      .Where(u => u.Token == token)
      .Select(u => new
      {
        Role = u.Role
      })
      .FirstOrDefaultAsync();

    if (user!.Role == User.ERole.Admin)
    {
      return StatusCode(200, new
      {
        Message = "Admin verified successfully"
      });
    }
    else
    {
      return StatusCode(400, new
      {
        Message = "User not admin"
      });
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

  [HttpPost("deleteUser")]
  public async Task<ActionResult<User>> DeleteUser([FromBody] deleteUserDto deleteUserDto)
  {
    var idNumber = int.Parse(deleteUserDto.Id);

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
}