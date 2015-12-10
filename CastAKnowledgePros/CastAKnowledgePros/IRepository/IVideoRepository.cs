using CastAKnowledgePros.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CastAKnowledgePros.IRepository
{
    public interface IVideoRepository
    {
        IEnumerable<VideoModel> GetAllVideos();
        IEnumerable<VideoModel> GetAllVideos(string searchTerm, int page);
        IEnumerable<VideoModel> AutoComplete(string term);

        void CreateVid(VideoModel vidModel);
        void EditEntityStateModified(VideoModel vidModel);
        void SaveChanges();
        void Dispose(bool disposing);
        void RemoveVid(VideoModel removeVid);
        IEnumerable<VideoModel> GetPageEnglish(string pageSection, int page);
        IEnumerable<VideoModel> GetPageSpanish(string pageSection, int page);
    }
}
