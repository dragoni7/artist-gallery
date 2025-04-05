using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Api.Functions
{
    public class RemoveImageFunction
    {
        private readonly ILogger<RemoveImageFunction> _logger;
        private readonly ImageService _imageService;

        public RemoveImageFunction(ILogger<RemoveImageFunction> logger, ImageService imageService)
        {
            _logger = logger;
            _imageService = imageService;
        }

        [Function("RemoveImage")]
        public async Task<IActionResult> RunAsync([HttpTrigger(AuthorizationLevel.Function, "delete")] HttpRequest req)
        {
            if (req.HasJsonContentType())
            {
                var name = await req.ReadFromJsonAsync<string>();
                var result = await _imageService.DeleteAsync(name);

                return new OkObjectResult(result);
            }

            return new BadRequestObjectResult("Expected JSON type.");
        }
    }
}
