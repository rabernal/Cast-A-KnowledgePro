using CastAKnowledgePros.Models;
using CastAKnowledgePros.Repository;
using CastAKnowledgePros.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace CastAKnowledgePros
{
    /// <summary>
    /// Summary description for VideoService
    /// </summary>
    //[WebService(Namespace = "http://tempuri.org/")]
    [WebService(Namespace = "http://castaknowledge.azurewebsites.net")]

    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]

    public class VideoService : System.Web.Services.WebService // webService allows to use session
    {
        private IVideoRepository _getAllVidsFromIVideoRepository;
        private readonly VideoRepository myDb = new VideoRepository();

        public VideoService()
        {
            _getAllVidsFromIVideoRepository = myDb;
        }//paramiterless constructor

        [WebMethod(Description = "Gets auto complete", EnableSession = true)]
        public IEnumerable<VideoModel> AutoComplete(string term)
        {
            return _getAllVidsFromIVideoRepository.AutoComplete(term);
        }

        [WebMethod(Description = "Gets all the videos from db", EnableSession = true)]
        public IEnumerable<VideoModel> GetAllVideos()
        {
            // here is where you put a message stating that no videos were return. a redirect page.   
            return _getAllVidsFromIVideoRepository.GetAllVideos();
        }
        [WebMethod(Description = "Get all videos form with paramiters", EnableSession = true)]
        public IEnumerable<VideoModel> GetAllVideos(string searchTerm, int page)
        {
            // here is where you put a message stating that no videos were return. a redirect page.   
            return _getAllVidsFromIVideoRepository.GetAllVideos(searchTerm, page);
        }

        [WebMethod(Description = "Gets all page width vid category English", EnableSession = true)]
        public IEnumerable<VideoModel> GetPageEnglish(string pageSection, int page)
        {
            return _getAllVidsFromIVideoRepository.GetPageEnglish(pageSection, page);

        }
        [WebMethod(Description = "Gets all page width vid category Espanol", EnableSession = true)]
        public IEnumerable<VideoModel> GetPageSpanish(string pageSection, int page)
        {
            return _getAllVidsFromIVideoRepository.GetPageSpanish(pageSection, page);
        }

        [WebMethod(Description = "Creates a new video and adds to db")]
        public void CreateVid(VideoModel vidModel)
        {
            _getAllVidsFromIVideoRepository.CreateVid(vidModel);
        }

        [WebMethod(Description = "Checks for the state of the video, used only when editing the video")]
        public void EditEntityStateModified(VideoModel vidModel)
        {
            _getAllVidsFromIVideoRepository.EditEntityStateModified(vidModel);
        }

        [WebMethod(Description = "Saves changes to a video")]
        public void SaveChanges()
        {
            _getAllVidsFromIVideoRepository.SaveChanges();
        }



        [WebMethod(Description = "Removes as spesific video from db")]
        public void RemoveVid(VideoModel removeVid)
        {
            _getAllVidsFromIVideoRepository.RemoveVid(removeVid);
        }
    }
}
