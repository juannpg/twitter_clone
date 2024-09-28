using Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase // es necesario que nuestra clase herede de ControllerBase porque así obtenemos muchas fucionalidades como el uso de HttpContext
{
  private readonly ApplicationDbContext _context; // creamos una variable readonly que nos permite acceder al contexto de la base de datos

  public UsersController(ApplicationDbContext context) // contructor que recibe el contexto de la base de datos
  {
    _context = context; // asignamos el contexto a la variable _context para que sea accesible en todas las funciones
  }

  public class RegisterDto
  {
    public required string Email { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
  }

  public class LoginDto
  {
    public required string Username { get; set; }
    public required string Password { get; set; }
  }

  [HttpPost("register")]
  public async Task<ActionResult<User>> Register([FromBody] RegisterDto registerDto)
  {
    var user1 = await _context.Users
      .Where(u => u.Id == 1)
      .FirstOrDefaultAsync();

    var admins = await _context.Users
      .Where(u => u.Role == backend.Models.User.ERole.Admin)
      .ToListAsync();

    int role = 0;
    if (user1 == null && admins.Count == 0)
    {
      role = 1;
    }

    var user = new User
    {
      Email = registerDto.Email,
      Username = registerDto.Username,
      Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
      Role = (backend.Models.User.ERole)role
    };

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    if (user == null)
    {
      return StatusCode(400, new
      {
        Message = "Error creating user"
      });
    }

    return StatusCode(200, new
    {
      Message = "Register successful",
      User = new
      {
        Username = user.Username
      }
    });
  }

  [HttpPost("login")]
  public async Task<ActionResult<User>> Login([FromBody] LoginDto loginDto)
  {
    var username = loginDto.Username;
    var password = loginDto.Password;

    var user = await _context.Users
      .Where(u => u.Username == username)
      .Select(u => new
      {
        Username = u.Username,
        Password = u.Password,
        Token = u.Token
      })
      .FirstOrDefaultAsync();

    if (user == null)
    {
      return StatusCode(404, new
      {
        Message = "Invalid credentials"
      });
    }

    bool verified = BCrypt.Net.BCrypt.Verify(password, user.Password);

    if (!verified)
    {
      return StatusCode(404, new
      {
        Message = "Invalid credentials"
      });
    }

    return StatusCode(200, new
    {
      Message = "Login successful",
      User = new
      {
        Username = user.Username,
        Token = user.Token
      }
    });
  }
}