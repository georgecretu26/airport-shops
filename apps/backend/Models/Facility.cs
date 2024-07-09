namespace backend.Models;
public class Facility
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Location { get; set; }
    public required string OpeningHours { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
    public required string Logo { get; set; }
    public List<string>? ImageGallery { get; set; }
    public required string Category { get; set; }
    public required string Subcategory { get; set; }
    public string? Keywords { get; set; }
}
