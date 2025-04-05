using FishyFlip;
using FishyFlip.Models;

namespace Api.Services
{
	public class BlueskyService
	{
		private readonly string _identifier = Environment.GetEnvironmentVariable("BLUESKY_IDENTIFIER", EnvironmentVariableTarget.Process);
		private readonly string _password = Environment.GetEnvironmentVariable("BLUESKY_PASSWORD", EnvironmentVariableTarget.Process);

		private readonly ATProtocol _blueskyClient;

		public BlueskyService()
		{
			var atProtocolBuilder = new ATProtocolBuilder().EnableAutoRenewSession(true);
			_blueskyClient = atProtocolBuilder.Build();
		}

		public async Task<bool> Authenticate()
		{
			var session = await _blueskyClient.AuthenticateWithPasswordAsync(_identifier, _password);

			if (session is null)
			{
				Console.WriteLine("Failed to authenticate.");
				return false;
			}

			return true;
		}

		public async Task<Image?> UploadBlobAsync(byte[] data)
		{
			Image? image = null;

			var blobResult = await _blueskyClient.Repo.UploadImageAsync(data);

			await blobResult.SwitchAsync(
				async success =>
				{
					image = success.Blob.ToImage();
				},
				async error =>
				{

				});

			return image;
		}

		public async Task<Result<CreatePostResponse>> UploadImagePostAsync(ImagesEmbed postImages, string prompt) => await _blueskyClient.Repo.CreatePostAsync(prompt, null, postImages);
	}
}
