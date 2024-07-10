using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using backend.Models;
using backend.Data;
namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FacilitiesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FacilitiesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Facility>>> GetFacilities()
    {
        return await _context.Facilities.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Facility>> GetFacility(int id)
    {
        var facility = await _context.Facilities.FindAsync(id);

        if (facility == null)
        {
            return NotFound();
        }

        return facility;
    }

    [HttpPost]
    public async Task<ActionResult<Facility>> PostFacility(Facility facility)
    {
        _context.Facilities.Add(facility);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetFacility), new { id = facility.Id }, facility);
    }

    [HttpPost("reset")]
    public IActionResult ResetDatabase()
    {
        DbInitializer.Reset(_context);
        return Ok("Database reset to initial seed.");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutFacility(int id, Facility facility)
    {
        if (id != facility.Id)
        {
            return BadRequest();
        }

        _context.Entry(facility).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFacility(int id)
    {
        var facility = await _context.Facilities.FindAsync(id);
        if (facility == null)
        {
            return NotFound();
        }

        _context.Facilities.Remove(facility);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
