using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Api.Functions
{
    public class SendDiscordMessage
    {
        private readonly ILogger<SendDiscordMessage> _logger;

        private readonly HttpClient _httpClient = new();

        private readonly string _commissionChannelWebhook = Environment.GetEnvironmentVariable("COMMISSIONS_WEBHOOK", EnvironmentVariableTarget.Process);
        private readonly string _artPostChannelWebhook = Environment.GetEnvironmentVariable("ART_POST_WEBHOOK", EnvironmentVariableTarget.Process);

        public SendDiscordMessage(ILogger<SendDiscordMessage> logger)
        {
            _logger = logger;
        }

        [Function("SendDiscordMessage")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic? data = JsonConvert.DeserializeObject(requestBody);

            string? channel = data?.channel;
            string? message = data?.message;

            if (channel == null)
                return new BadRequestObjectResult("Expected a channel");

            if (message == null)
                return new BadRequestObjectResult("Expected a message");

            if (!(channel == "commissions" || channel == "art post"))
                return new BadRequestObjectResult("Expected a channel that exists in server");

            var discordPayload = new
            {
                content = message
            };

            string jsonPayload = JsonConvert.SerializeObject(discordPayload);

            HttpResponseMessage response = await _httpClient.PostAsync(channel == "commissions" ? _commissionChannelWebhook : _artPostChannelWebhook, new StringContent(jsonPayload, Encoding.UTF8, "application/json"));


            if (response.IsSuccessStatusCode)
            {
                return new OkObjectResult($"Message sent to Discord: {message}");
            }
            else
            {
                _logger.LogError($"Failed to send message to Discord. Status code: {response.StatusCode}");
                return new StatusCodeResult(500);
            }
        }
    }
}
