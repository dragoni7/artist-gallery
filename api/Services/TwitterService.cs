using Api.Dtos;
using System.Text;
using Tweetinvi;
using Tweetinvi.Core.Web;
using Tweetinvi.Models;
using Tweetinvi.Models.DTO;

namespace Api.Services
{
    public class TwitterService
    {
        private readonly string _apiKey = Environment.GetEnvironmentVariable("TWITTER_API_KEY", EnvironmentVariableTarget.Process);
        private readonly string _apiSecret = Environment.GetEnvironmentVariable("TWITTER_API_SECRET", EnvironmentVariableTarget.Process);
        private readonly string _accessToken = Environment.GetEnvironmentVariable("TWITTER_API_ACCESS_TOKEN", EnvironmentVariableTarget.Process);
        private readonly string _accessTokenSecret = Environment.GetEnvironmentVariable("TWITTER_API_ACCESS_TOKEN_SECRET", EnvironmentVariableTarget.Process);

        private readonly ITwitterClient _twitterClient;

        public TwitterService()
        {
            _twitterClient = new TwitterClient(_apiKey, _apiSecret, _accessToken, _accessTokenSecret);
        }

        public async Task<IUploadedMediaInfo> UploadMediaAsync(byte[] media)
        {
            IMedia uploadedImage = await _twitterClient.Upload.UploadTweetImageAsync(media);
            return uploadedImage.UploadedMediaInfo;
        }

        public async Task<ITwitterResult> UploadMediaTweetAsync(PostTweetRequestDto newTweet)
        {
			var jsonBody = _twitterClient.Json.Serialize(newTweet);

			return await _twitterClient.Execute.AdvanceRequestAsync(
                (ITwitterRequest request) =>
			    {
				    var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

				    request.Query.Url = "https://api.twitter.com/2/tweets";
				    request.Query.HttpMethod = Tweetinvi.Models.HttpMethod.POST;
				    request.Query.HttpContent = content;
			    });
		}
    }
}
