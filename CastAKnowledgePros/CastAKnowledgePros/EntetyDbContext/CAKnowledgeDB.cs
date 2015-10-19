using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CastAKnowledgePros.Models
{
    public class CAKnowledgeDB : DbContext
    {
        public CAKnowledgeDB() : base("name=DefaultConnection")
        {

        }
        public DbSet<VideoModel> MyVideos { get; set; }
        public DbSet<VideoReviewModel> MyVideosReviews { get; set; }
    }
}