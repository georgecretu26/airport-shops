namespace backend.Models;
public class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; } // Note: In a real application, we would never store passwords as plain text. Use hashing and salting.

    public required string Role { get; set; }
    public int? AssignedShopId { get; set; } // Nullable for Admin users who are not tied to a specific shop.
}
