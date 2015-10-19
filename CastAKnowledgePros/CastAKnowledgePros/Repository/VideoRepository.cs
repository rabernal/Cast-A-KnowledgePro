using CastAKnowledgePros.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CastAKnowledgePros.Models;
using System.Data.Entity;

namespace CastAKnowledgePros.Repository
{
    public class VideoRepository : IVideoRepository
    {
        //private ApplicationDbContext _db;
        private CAKnowledgeDB _db;

        //private List<VideoModel> results = new List<VideoModel>();

        //public VideoRepository(ApplicationDbContext db)
        //{
        //    _db = db;
        //}
        public VideoRepository()
        {
            _db = new CAKnowledgeDB();
            //_db = new ApplicationDbContext();
        }

        public void CreateVid(VideoModel vidModel)
        {
            _db.MyVideos.Add(vidModel);
            //_db.VideoModels.Add(vidModel);

        }

        public void EditEntityStateModified(VideoModel vidModel)
        {
            _db.Entry(vidModel).State = EntityState.Modified;
        }

        public List<VideoModel> GetAllVideos()
        {
            var allVideosList = new List<VideoModel>();

            //return allVideosList = _db.VideoModels.ToList();
            return allVideosList = _db.MyVideos.ToList();
            
        }

        public void SaveChanges()
        {
            _db.SaveChanges();
        }

        public void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            //base.Dispose(disposing);
        }

        public void RemoveVid(VideoModel removeVid)
        {
            //_db.VideoModels.Remove(removeVid);
            _db.MyVideos.Remove(removeVid);
        }

        public List<VideoModel> GetPageEnglish(string pageSection)
        {
            var allVideosList = _db.MyVideos.ToList();
            var model = allVideosList
                .OrderByDescending(i => i.Id)
                .Where(t => t.VidCategory.ToLower().StartsWith(pageSection.ToLower()));
            //return allVideosList = _db.VideoModels.ToList();
            return model.ToList();
        }

        public List<VideoModel> GetPageSpanish(string pageSection)
        {
            var allVideosList = _db.MyVideos.ToList();

            //return allVideosList = _db.VideoModels.ToList();
            var model = allVideosList
                .OrderByDescending(i => i.Id)
                .Where(t => t.VidLanguage.ToLower().StartsWith(pageSection.ToLower()));
            //return allVideosList = _db.VideoModels.ToList();
            return model.ToList();
        }
    }
}