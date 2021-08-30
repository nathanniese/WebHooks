using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Realms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Webhook.Api.Controllers
{
    public class Webhooks : RealmObject
    {
        public string Path { get; set; }
    }
    public class WebHookData : RealmObject
    {
        public string WebhookPath { get; set; }
        public string Data { get; set; }
    }
    [ApiController]
    [Route("[controller]")]
    public class WebhookController : ControllerBase
    {

        private readonly ILogger<WebhookController> _logger;

        public WebhookController(ILogger<WebhookController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetAllPaths")]
        public string GetAllPaths()
        {
            return "Hello";
        }
        [HttpPost("{path}")]
        public string Post(string path,[FromBody] dynamic data)
        {
            var body = Convert.ToString(data);
            var realm = Realm.GetInstance();
            var current = realm.All<Webhooks>().Where(d=>d.Path == path).FirstOrDefault();
            if(current != null)
            {
                realm.Write(() =>
                {
                    realm.Add(new WebHookData { WebhookPath = path, Data = body});
                });
            }
            else
            {
                return "This path has not been definded";
            }
            return "Data Saved";
        }
        [HttpGet("CreatePath/{path}")]
        public string CreatePath(string path)
        {
            var realm = Realm.GetInstance();
            var current = realm.All<Webhooks>().Where(d => d.Path == path).FirstOrDefault();
            if (!string.IsNullOrEmpty(path) && current == null)
            {
                realm.Write(() =>
                {
                    realm.Add(new Webhooks { Path = path });

                });
            }
            else
            {
                return "This path is already definded";
            }
            return "Data Saved";
        }
        [HttpGet("DeletePath/{path}")]
        public string DeletePath(string path)
        {
            var realm = Realm.GetInstance();
            var current = realm.All<Webhooks>().Where(d => d.Path == path).FirstOrDefault();
            if (!string.IsNullOrEmpty(path) && current != null)
            {
                realm.Write(() =>
                {
                    realm.Remove(current);

                });
            }
            else
            {
                return "This path is not definded";
            }
            return "Data Removed";
        }
    }
}
