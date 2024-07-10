# Use the official ASP.NET runtime image as the base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Use the official .NET SDK image for the build process
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["apps/backend/backend.csproj", "apps/backend/"]
RUN dotnet restore "apps/backend/backend.csproj"

# Copy the entire source code
COPY . .

# Build the project
WORKDIR "/src/apps/backend"
RUN dotnet build "backend.csproj" -c Release -o /app/build

# Publish the project
FROM build AS publish
RUN dotnet publish "backend.csproj" -c Release -o /app/publish

# Create the final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]
