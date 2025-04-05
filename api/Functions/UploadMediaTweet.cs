using Api.Dtos;
using Api.Services;
using Api.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Api.Functions
{
    public class UploadMediaTweet
    {
        private readonly ILogger<UploadMediaTweet> _logger;
        private readonly TwitterService _tweetService;

        public UploadMediaTweet(ILogger<UploadMediaTweet> logger, TwitterService tweetService)
        {
            _logger = logger;
            _tweetService = tweetService;
        }

        [Function("UploadMediaTweet")]
        public async Task<IActionResult> RunAsync([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
        {
            if (req.HasFormContentType)
            {
                string text = req.Form["text"].ToString();
                List<string> mediaIDs = new();

                foreach (var file in req.Form.Files)
                {
                    byte[] bytes = await file.LosslessCompressToBytesAsync();

                    var mediaResult = await _tweetService.UploadMediaAsync(bytes);

                    mediaIDs.Add(mediaResult.MediaIdStr);
                }

                PostTweetRequestDto newTweet = new() { Text = text, Media = new() { MediaIds = mediaIDs.ToArray() } };

                var result = await _tweetService.UploadMediaTweetAsync(newTweet);

                return result != null && result.Response.IsSuccessStatusCode ? new OkObjectResult("Tweet upload success! " + result.Content) : new BadRequestObjectResult("Tweet upload failed " + result.Content);
            }

            return new BadRequestObjectResult("Expected FormContent type.");
        }
    }
}
