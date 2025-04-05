using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Api.Functions
{
    public class UploadImageFunction
    {
        private readonly ILogger<UploadImageFunction> _logger;
        private readonly ImageService _imageService;

        public UploadImageFunction(ILogger<UploadImageFunction> logger, ImageService imageService)
        {
            _logger = logger;
            _imageService = imageService;
        }

        [Function("UploadImage")]
        public async Task<IActionResult> RunAsync([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
        {
            if (req.HasFormContentType)
            {
                var file = req.Form.Files["file"];
                var result = await _imageService.UploadAsync(file);

                return new OkObjectResult(result.Blob.Uri);
            }

            return new BadRequestObjectResult("Expected FormContent type.");
        }
    }
}
