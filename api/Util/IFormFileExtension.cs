using ImageMagick;
using Microsoft.AspNetCore.Http;

namespace Api.Util
{
	public static class IFormFileExtension
	{
		public static async Task<byte[]> CompressToBytesAsync(this IFormFile file)
		{
			var image = new MagickImage(file.OpenReadStream());

			using (MemoryStream memoryStream = new())
			{
				uint newWidth;
				uint newHeight;

				if (image.Width > image.Height)
				{
					newWidth = (uint)(image.Width / 1.6);
					newHeight = (uint)(image.Height / 1.6);

					image.Resize(new MagickGeometry(Math.Min(1920, newWidth), Math.Min(1080, newHeight)));
				}
				else
				{
					newWidth = (uint)(image.Width / 1.6);
					newHeight = (uint)(image.Height / 1.6);

					image.Resize(new MagickGeometry(Math.Min(1080, newWidth), Math.Min(1920, newHeight)));
				}

				await image.WriteAsync(memoryStream);

				memoryStream.Position = 0;

				ImageOptimizer optimizer = new();
				optimizer.OptimalCompression = true;
				optimizer.Compress(memoryStream);

				memoryStream.Position = 0;

				return memoryStream.ToArray();
			}
		}

		public static async Task<byte[]> LosslessCompressToBytesAsync(this IFormFile file)
		{
			using (MemoryStream memoryStream = new())
			{
				await file?.OpenReadStream()?.CopyToAsync(memoryStream);

				memoryStream.Position = 0;

				ImageOptimizer optimizer = new();
				optimizer.LosslessCompress(memoryStream);

				return memoryStream.ToArray();
			}
		}
	}
}
