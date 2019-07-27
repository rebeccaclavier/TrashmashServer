using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Trashmash.Controllers
{
    public class Submission
    {
        public IFormFile File { get; set; }
        public string Server { get; set; }
        public string User { get; set; }
    }

    [Route("api/")]
    public class GameController : Controller
    {
        private string GetPath(string server)
        {
            return $"/trashmash/{server}";
        }

        /*
        [HttpPost]
        [Route("game")]
        public IActionResult CreateGame(string server)
        {
            System.IO.Directory.CreateDirectory(GetPath(server));
            return Ok(new { message = "game created" });
        }
        */

        private bool DoesGameExist(string server)
        {
            if (System.IO.Directory.Exists(GetPath(server)))
            {
                return true;
            }

            return false;
        }

        [HttpGet]
        [Route("game")]
        public IActionResult DoesGameExistRoute(string server)
        {
            if (DoesGameExist(server)) 
            {
                return Ok(new { message = "game found"});
            }

            return NotFound(new { error = true, message = "game not found"});
        }

        [HttpDelete]
        [Route("game")]
        public IActionResult DeleteGame(string server)
        {
            if (DoesGameExist(server)) 
            {
                System.IO.Directory.Delete(GetPath(server), true);
                return Ok(new { message = "game deleted" });
            }
            
            return NotFound(new { error = true, message = "game not found"});
        }

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> Upload([FromForm] Submission submission)
        {
            if (submission.File.Length > 0)
            {
                if (!DoesGameExist(submission.Server))
                {
                    return NotFound(new { error = true, message = "game not found"});
                }

                using (var mash = new FileStream($"{GetPath(submission.Server)}/{submission.User}.mp3", FileMode.Create))
                {
                    await submission.File.CopyToAsync(mash);
                }
            }

            return Ok(new { message = "upload successful" });
        }
    }
}
