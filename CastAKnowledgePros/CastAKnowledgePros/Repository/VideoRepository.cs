using CastAKnowledgePros.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CastAKnowledgePros.Models;
using System.Data.Entity;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Dapper;
using PagedList;

namespace CastAKnowledgePros.Repository
{
    public class VideoRepository : IVideoRepository
    {
        //private ApplicationDbContext _db;
        private CAKnowledgeDB _db;

        public VideoRepository()
        {
            _db = new CAKnowledgeDB();
        }

        public void CreateVid(VideoModel vidModel)
        {
            _db.MyVideos.Add(vidModel);
        }

        public void EditEntityStateModified(VideoModel vidModel)
        {
            _db.Entry(vidModel).State = EntityState.Modified;
        }

        public IEnumerable<VideoModel> GetAllVideos()
        {
            return _db.MyVideos;
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
        }

        public void RemoveVid(VideoModel removeVid)
        {
            _db.MyVideos.Remove(removeVid);
        }


        public IEnumerable<VideoModel> GetAllVideos(string searchTerm, int page)
        {
            var model = _db.MyVideos
                .OrderByDescending(i => i.VidAdded)
                //.Where(r => searchTerm == null || r.VidTitle.ToLower().StartsWith(searchTerm.ToLower()))
                .Where(r => searchTerm == null || r.VidTitle.ToLower().Contains(searchTerm.ToLower()))
                .ToPagedList(page, 4);
            return model;
        }

        public IEnumerable<VideoModel> AutoComplete(string term)
        {
            var model = _db.MyVideos
                .Where(v => v.VidTitle.ToLower().Contains(term.ToLower()))
                .OrderByDescending(i => i.Id)
                .Take(4);
            return model;
        }

        public IEnumerable<VideoModel> GetPageEnglish(string pageSection, int page)
        {

            var model = _db.MyVideos.OrderByDescending(i => i.Id)
                        .Where(t => t.VidCategory.ToLower().StartsWith(pageSection.ToLower()))
                        .ToPagedList(page, 4);
            return model;

        }

        public IEnumerable<VideoModel> GetPageSpanish(string pageSection, int page)
        {
            var model = _db.MyVideos.OrderByDescending(i => i.Id)
            .Where(t => t.VidLanguage.ToLower().StartsWith(pageSection.ToLower()))
            .ToPagedList(page, 4);
            return model;
        }
    }
}