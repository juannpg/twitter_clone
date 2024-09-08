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
    
    _context.Users.Remove(userToDelete);
    await _context.SaveChangesAsync();

    return StatusCode(200, new
    {
      Message = "User deleted successfully"
    });
  }
}