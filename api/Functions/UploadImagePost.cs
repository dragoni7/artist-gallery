using Api.Services;
using Api.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using FishyFlip.Models;

namespace Api.Functions
{
    public class UploadImagePost
    {
        private readonly ILogger<UploadImagePost> _logger;
        private readonly BlueskyService _blueskyService;

        public UploadImagePost(ILogger<UploadImagePost> logger, BlueskyService blueskyService)
        {
            _logger = logger;
            _blueskyService = blueskyService;
        }

        [Function("UploadImagePost")]
        public async Task<IActionResult> RunAsync([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
        {
            if (req.HasFormContentType)
            {
                bool authenticated = await _blueskyService.Authenticate();

                if (!authenticated)
                {
					return new BadRequestObjectResult("Could not authenticate bluesky account");
				}

                List<ImageEmbed> postImages = new();
				string text = req.Form["text"].ToString();

				foreach (var file in req.Form.Files)
                {

                    byte[] bytes = await file.LosslessCompressToBytesAsync();

					// bluesky size limit
					if (bytes.Length > 999997.44)
                    {
                        bytes = await file.CompressToBytesAsync();
                    }

					Image? image = await _blueskyService.UploadBlobAsync(bytes);

					if (image != null)
					{
						postImages.Add(new(image, file.Name));
					}
				}

                if (postImages.Count > 0)
                {
                    var result = await _blueskyService.UploadImagePostAsync(new ImagesEmbed(postImages.ToArray()), text);

                    ObjectResult finalResponse = null;

                    await result.SwitchAsync(
                        async success =>
                        {
						    finalResponse = new OkObjectResult("Uploaded bluesky post at " + success.Uri);
						},
                        async error =>
                        {
						    finalResponse = new BadRequestObjectResult("Images could not be uploaded to bluesky. " + error.Detail);
						});

                    return finalResponse;
				}
                else
                {
					return new BadRequestObjectResult("Images could not be uploaded to bluesky.");
				}
			}

			return new BadRequestObjectResult("Expected FormContent type.");
		}
    }
}
