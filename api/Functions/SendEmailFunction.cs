using Azure;
using Azure.Communication.Email;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Api.Functions
{
    public class SendEmailFunction
    {
        private readonly ILogger<SendEmailFunction> _logger;

        public SendEmailFunction(ILogger<SendEmailFunction> logger)
        {
            _logger = logger;
        }

        [Function("SendEmail")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            _logger.LogInformation($"New email request: \n {data}");

            string handle = data?.contactHandle;
            string email = data?.paypal;
            string description = data?.description;
            string tier = data?.commissionTier;
            string isPrivate = data?["private"];

            var myEmail = Environment.GetEnvironmentVariable("MY_EMAIL", EnvironmentVariableTarget.Process);
            var senderEmail = Environment.GetEnvironmentVariable("SENDER_EMAIL", EnvironmentVariableTarget.Process);
            var emailClient = new EmailClient(Environment.GetEnvironmentVariable("AzureCommunicationServicesConnectionString", EnvironmentVariableTarget.Process));

            try
            {
                // send email to self
                var selfEmailSendOperation = await emailClient.SendAsync(
                    wait: WaitUntil.Completed,
                    senderAddress: senderEmail,
                    recipientAddress: myEmail,
                    subject: $"New commission request from {handle} ({email})",
                    htmlContent:
                    $"<html><body> <h4>New commission request:</h4> <br /> <b>Handle:</b> {handle}<br /> <b>PayPal Email</b>: {email}<br /><b>Tier:</b> {tier}<br /> <b>Private:</b> {isPrivate}<br /> <b>Description:</b> <br /><div style=\"width: 600px; word-wrap: break-word\">{description}</div></body></html>");
                _logger.LogInformation($"Email sent with message ID: {selfEmailSendOperation.Id} and status: {selfEmailSendOperation.Value.Status}");

                // send email to contact
                var contactEmailSendOperation = await emailClient.SendAsync(
                    wait: WaitUntil.Completed,
                    senderAddress: senderEmail,
                    recipientAddress: email,
                    subject: "Your commission request was sent!",
                    htmlContent: "<html><body> Thank you for requesting a commission. If your request is selected, I will reach out to you! </body></html>");
                _logger.LogInformation($"Email sent with message ID: {contactEmailSendOperation.Id} and status: {contactEmailSendOperation.Value.Status}");

                return new OkObjectResult("Emails successfully sent.");
            }
            catch (RequestFailedException ex)
            {
                _logger.LogError($"Sending email operation failed with error code: {ex.ErrorCode}, message: {ex.Message}");
                return new ConflictObjectResult($"Error sending email: {ex.ErrorCode}: {ex.Message}");
            }
        }
    }
}
