using Newtonsoft.Json;

namespace Api.Dtos
{
    public class PostTweetRequestDto
    {
        [JsonProperty("text")]
        public string Text { get; set; } = string.Empty;

		[JsonProperty("media")]
		public TweetMediaDto Media { get; set; }
    }

    public class TweetMediaDto
    {
		[JsonProperty("media_ids")]
		public string[] MediaIds { get; set; }
    }
}
