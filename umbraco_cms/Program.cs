WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add CORS services only in development
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
    });
}

// Add memory cache for YouTube API responses
builder.Services.AddMemoryCache();

// Register typed HttpClient for YouTube service
// This automatically registers IHttpClientFactory and YouTubeService as transient
builder.Services.AddHttpClient<UmbracoCms.Services.YouTubeService>();

// Register the interface mapping for dependency injection
builder.Services.AddScoped<UmbracoCms.Services.IYouTubeService>(provider => 
    provider.GetRequiredService<UmbracoCms.Services.YouTubeService>());

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddDeliveryApi()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

// Use CORS middleware only in development
if (app.Environment.IsDevelopment())
{
    app.UseCors();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

await app.RunAsync();
