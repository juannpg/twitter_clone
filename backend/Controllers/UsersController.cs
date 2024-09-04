using Data;
using Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace csharp_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public UsersController(ApplicationDbContext context)
  {
    _context = context;
  }

  public class LoginDto
  {
    public required string Username { get; set; }
    public required string Password { get; set; }
  }

  [HttpPost("register")]
  public async Task<ActionResult<User>> Register([FromBody] User user)
  {
    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    if (user == null)
    {
      return StatusCode(400, new
      {
        Message ="Error creating user"
      });
    }

    return StatusCode(200, new{
      Message = "Register successful",
      User = user
    });
  }

  [HttpPost("login")]
  public async Task<ActionResult<User>> Login([FromBody] LoginDto loginDto)
  {
    var username = loginDto.Username;
    var password = loginDto.Password;

    var user = await _context.Users
      .Where(u => u.Username == username && u.Password == password)
      .Select(u => new
      {
        Id = u.Id,
        Username = u.Username,
        Password = u.Password,
        Token = u.Token
      })
      .FirstOrDefaultAsync();

    if (user == null)
    {
      return StatusCode(404, new
      {
        Message ="Invalid credentials"
      });
    }

    return StatusCode(200, new
    {
      Message = "Login successful",
      User = user
    });
  }
}