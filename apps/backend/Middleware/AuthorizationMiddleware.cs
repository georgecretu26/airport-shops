using backend.Data;

namespace backend.Middleware;
public class AuthorizationMiddleware
{
    private readonly RequestDelegate _next;

    public AuthorizationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, ApplicationDbContext dbContext)
    {
        var path = context.Request.Path.ToString().ToLower();

        if (path.StartsWith("/api/admin"))
        {
            // Extract username from headers (for simplicity, in a real-world scenario use JWT or another secure method)
            var username = context.Request.Headers["Username"].FirstOrDefault();
            var user = dbContext.Users.FirstOrDefault(u => u.Username == username);

            if (user == null || user.Role != "Admin")
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Forbidden");
                return;
            }
        }

        if (path.StartsWith("/api/manager"))
        {
            var username = context.Request.Headers["Username"].FirstOrDefault();
            var user = dbContext.Users.FirstOrDefault(u => u.Username == username);

            if (user == null || user.Role != "Manager")
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                await context.Response.WriteAsync("Forbidden");
                return;
            }
        }

        await _next(context);
    }
}
