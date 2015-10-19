using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CastAKnowledgePros.Models
{
    public class VideoModel
    {
        public int Id { get; set; }
        public string VidSource { get; set; }
        public string VidTitle { get; set; }
        public string VidDescription { get; set; }
        public string VidCategory { get; set; }
        public DateTime VidAdded { get; set; }
        public string VidLanguage { get; set; }
        public char VidTerm { get; set; }
        public List<VideoReviewModel> VideoReviews { get; set; }
    }
}