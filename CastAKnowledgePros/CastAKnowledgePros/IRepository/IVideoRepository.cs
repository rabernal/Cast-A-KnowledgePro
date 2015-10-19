﻿using CastAKnowledgePros.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CastAKnowledgePros.IRepository
{
    public interface IVideoRepository
    {
        List<VideoModel> GetAllVideos();
        void CreateVid(VideoModel vidModel);
        void EditEntityStateModified(VideoModel vidModel);
        void SaveChanges();
        void Dispose(bool disposing);
        void RemoveVid(VideoModel removeVid);
        List<VideoModel> GetPageEnglish(string pageSection);
        List<VideoModel> GetPageSpanish(string pageSection);
    }
}