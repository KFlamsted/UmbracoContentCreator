using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Extensions;
using Nikcio.UHeadless;
using Nikcio.UHeadless.Defaults.ContentItems;

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

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .AddUHeadless(options =>
    {
        options.DisableAuthorization = true; // Change this later when adding authentication - See documentation
        options.AddDefaults();
        options.AddQuery<ContentByRouteQuery>();
        options.AddQuery<ContentByGuidQuery>();
    })
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

GraphQLEndpointConventionBuilder graphQLEndpointBuilder = app.MapUHeadless();

// Only enable the GraphQL IDE in development
if (!builder.Environment.IsDevelopment())
{
    graphQLEndpointBuilder.WithOptions(new GraphQLServerOptions()
    {
        Tool =
        {
            Enable = true,
        }
    });
}

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
