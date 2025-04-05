using Api.Dtos;
using Api.Util;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;

namespace Api.Services
{
    public class ImageService
    {
        private readonly string _storageAccount = Environment.GetEnvironmentVariable("STORAGE_USER", EnvironmentVariableTarget.Process);
        private readonly string _key = Environment.GetEnvironmentVariable("STORAGE_KEY", EnvironmentVariableTarget.Process);
        private readonly BlobContainerClient _filesContainer;

        public ImageService()
        {
            var credentials = new StorageSharedKeyCredential(_storageAccount, _key);
            var blobUri = $"https://{_storageAccount}.blob.core.windows.net";
            var blobServiceClient = new BlobServiceClient(new Uri(blobUri), credentials);
            _filesContainer = blobServiceClient.GetBlobContainerClient("container-images");
        }

        public async Task<BlobResponseDto> UploadAsync(IFormFile blob)
        {
            BlobResponseDto response = new();
            BlobClient client = _filesContainer.GetBlobClient(blob.FileName);
            var compressed = await blob.LosslessCompressToBytesAsync();

            using (var data = new MemoryStream(compressed, false))
            {
                await client.UploadAsync(data, new BlobHttpHeaders() { ContentType = "image/png"});
            }

            response.Status = $"File {blob.FileName} Uploaded Successfully";
            response.Error = false;
            response.Blob.Uri = client.Uri.AbsoluteUri;
            response.Blob.Name = client.Name;

            return response;
        }

        public async Task<BlobResponseDto> DeleteAsync(string blobFilename)
        {
            BlobClient file = _filesContainer.GetBlobClient(blobFilename);

            await file.DeleteAsync();

            return new BlobResponseDto { Error = false, Status = $"File {blobFilename} deleted successfully." };
        }
    }
}
