using backend.Models;

namespace backend.Data;


public static class DbInitializer
{
    public static void Initialize(ApplicationDbContext context)
    {
        context.Database.EnsureCreated();

        // Seed Roles
        if (!context.Roles.Any())
        {
            context.Roles.AddRange(
                new Role { Name = "Admin" },
                new Role { Name = "Manager" }
            );
            context.SaveChanges();
        }

        // Seed Users
        if (!context.Users.Any())
        {
            context.Users.AddRange(
                new User { Username = "admin", Password = "password", Role = "Admin" },
                new User { Username = "manager", Password = "password", Role = "Manager", AssignedShopId = 1 }
            );
            context.SaveChanges();
        }

        // Seed Facilities 
        if (!context.Facilities.Any())
        {
            var facilities = new Facility[]
{
    new Facility
    {
        Title = "Jack & Jones",
        Description = "A trendy clothing store offering the latest in fashion.",
        Location = "Terminal 1, Gate 5",
        OpeningHours = "9 AM - 9 PM",
        PhoneNumber = "123-456-7890",
        Email = "shop1@airport.com",
        Logo = "https://fakeimg.pl/150x130?text=Jack+n+Jones",
        ImageGallery = new List<string>
        {
            "https://fakeimg.pl/600x400?text=Jack+n+Jones+Image+1",
            "https://fakeimg.pl/600x400?text=Jack+n+Jones+Image+2",
            "https://fakeimg.pl/600x400?text=Jack+n+Jones+Image+3",
            "https://fakeimg.pl/600x400?text=Jack+n+Jones+Image+4"
        },
        Category = "Shopping",
        Subcategory = "Clothing",
        Keywords = "clothes, fashion, trendy"
    },
    new Facility
    {
        Title = "7 eleven",
        Description = "A well-known burger chain offering a variety of meals.",
        Location = "Terminal 2, Gate B2",
        OpeningHours = "6 AM - 10 PM",
        PhoneNumber = "098-765-4321",
        Email = "shop2@example.com",
        Logo = "https://fakeimg.pl/150x130?text=7+eleven",
        ImageGallery = new List<string>
        {
            "https://fakeimg.pl/600x400?text=7+eleven+Image+1",
            "https://fakeimg.pl/600x400?text=7+eleven+Image+2",
            "https://fakeimg.pl/600x400?text=7+eleven+Image+3",
            "https://fakeimg.pl/600x400?text=7+eleven+Image+4",
            "https://fakeimg.pl/600x400?text=7+eleven+Image+5"
        },
        Category = "Dining",
        Subcategory = "Fast Food",
        Keywords = "burger, fast food, meals"
    },
    new Facility
    {
        Title = "7 eleven",
        Description = "A well-known burger chain offering a variety of meals.",
        Location = "Terminal 3, Gate C2",
        OpeningHours = "6 AM - 10 PM",
        PhoneNumber = "098-765-4321",
        Email = "shop2@example.com",
        Logo = "https://fakeimg.pl/150x130?text=7+eleven",
        ImageGallery = new List<string>
        {
            "https://fakeimg.pl/600x400?text=7+eleven+Image+1",
            "https://fakeimg.pl/600x400?text=7+eleven+Image+2",
            "https://fakeimg.pl/600x400?text=7+eleven+Image+3",
            "https://fakeimg.pl/600x400?text=7+eleven+Image+4",
            "https://fakeimg.pl/600x400?text=7+eleven+Image+5"
        },
        Category = "Dining",
        Subcategory = "Fast Food",
        Keywords = "burger, fast food, meals"
    },
    new Facility
    {
        Title = "Bookstoria",
        Description = "A bookstore with a wide range of books and magazines.",
        Location = "Terminal 3, Gate C10",
        OpeningHours = "8 AM - 8 PM",
        PhoneNumber = "234-567-8901",
        Email = "shop3@example.com",
        Logo = "https://fakeimg.pl/150x130?text=Bookstoria",
        ImageGallery = new List<string>
        {
            "https://fakeimg.pl/600x400?text=Bookstoria+Image+1",
            "https://fakeimg.pl/600x400?text=Bookstoria+Image+2",
            "https://fakeimg.pl/600x400?text=Bookstoria+Image+3"
        },
        Category = "Shopping",
        Subcategory = "Books",
        Keywords = "books, magazines, literature"
    },
    new Facility
    {
        Title = "Espresso Bar",
        Description = "A coffee shop offering a variety of drinks and snacks.",
        Location = "Terminal 4, Gate 12",
        OpeningHours = "6 AM - 6 PM",
        PhoneNumber = "345-678-9012",
        Email = "shop4@example.com",
        Logo = "https://fakeimg.pl/150x130?text=Espresso+Bar",
        ImageGallery = new List<string>
        {
            "https://fakeimg.pl/600x400?text=Espresso+Bar+Image+1",
            "https://fakeimg.pl/600x400?text=Espresso+Bar+Image+2",
            "https://fakeimg.pl/600x400?text=Espresso+Bar+Image+3",
            "https://fakeimg.pl/600x400?text=Espresso+Bar+Image+4",
            "https://fakeimg.pl/600x400?text=Espresso+Bar+Image+5"
        },
        Category = "Dining",
        Subcategory = "Coffee",
        Keywords = "coffee, drinks, snacks"
    },
    new Facility
    {
        Title = "Espresso Bar",
        Description = "A coffee shop offering a variety of drinks and snacks.",
        Location = "Terminal 3, Gate C12",
        OpeningHours = "6 AM - 6 PM",
        PhoneNumber = "345-678-9012",
        Email = "shop4@example.com",
        Logo = "https://fakeimg.pl/150x130?text=Espresso+Bar",
        ImageGallery = new List<string>
        {
            "https://fakeimg.pl/600x400?text=Espresso+Bar+Image+1",
            "https://fakeimg.pl/600x400?text=Espresso+Bar+Image+2",
            "https://fakeimg.pl/600x400?text=Espresso+Bar+Image+3",
            "https://fakeimg.pl/600x400?text=Espresso+Bar+Image+4",
            "https://fakeimg.pl/600x400?text=Espresso+Bar+Image+5"
        },
        Category = "Dining",
        Subcategory = "Coffee",
        Keywords = "coffee, drinks, snacks"
    },
    new Facility
    {
        Title = "Apple Store",
        Description = "An electronics store offering the latest gadgets and accessories.",
        Location = "Terminal 1, Gate 8",
        OpeningHours = "10 AM - 10 PM",
        PhoneNumber = "456-789-0123",
        Email = "shop5@example.com",
        Logo = "https://fakeimg.pl/150x130?text=Apple",
        ImageGallery = new List<string>
        {
            "https://fakeimg.pl/600x400?text=Apple+Image+1",
            "https://fakeimg.pl/600x400?text=Apple+Image+2",
            "https://fakeimg.pl/600x400?text=Apple+Image+3",
            "https://fakeimg.pl/600x400?text=Apple+Image+4",
            "https://fakeimg.pl/600x400?text=Apple+Image+5",
            "https://fakeimg.pl/600x400?text=Apple+Image+6"
        },
        Category = "Shopping",
        Subcategory = "Electronics",
        Keywords = "electronics, gadgets, accessories"
    }
    // Add more facilities if needed
};


            foreach (var f in facilities)
            {
                context.Facilities.Add(f);
            }

            context.SaveChanges();
        }
    }

    public static void Reset(ApplicationDbContext context)
    {
        // Clear the data
        context.Roles.RemoveRange(context.Roles);
        context.Users.RemoveRange(context.Users);
        context.Facilities.RemoveRange(context.Facilities);
        context.SaveChanges();

        // Re-initialize the data
        Initialize(context);
    }
}
