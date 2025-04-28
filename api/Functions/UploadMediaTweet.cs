using System.Text.Json;
using Api.Dtos;
using Api.Services;
using Api.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Tweetinvi.Core.Extensions;
using Tweetinvi.Core.Web;

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

                ITwitterResult result = await _tweetService.UploadMediaTweetAsync(newTweet);

                if (result != null && result.Response.IsSuccessStatusCode)
                {
                    var responseJson = result.Response.Content;

                    using JsonDocument doc = JsonDocument.Parse(responseJson);
                    var tweetId = doc.RootElement.GetProperty("data").GetProperty("id").GetString();
                    return new OkObjectResult($"https://girlcockx.com/oniiyanna/status/{tweetId}");
                }

                return new BadRequestObjectResult("Tweet upload failed " + result.Response.Content);
            }

            return new BadRequestObjectResult("Expected FormContent type.");
        }
    }
}
