using Api.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services =>
    {
        services.AddSingleton<ImageService>();
        services.AddSingleton<TwitterService>();
        services.AddSingleton<BlueskyService>();
        services.Configure<LoggerFilterOptions>(options =>
        {
            LoggerFilterRule toRemove = options.Rules.FirstOrDefault(rule => rule.ProviderName == "Microsoft.Extensions.Logging.ApplicationInsights.ApplicationInsightsLoggerProvider");

            if (toRemove is not null)
                options.Rules.Remove(toRemove);
        });
    })
    .Build();

host.Run();
