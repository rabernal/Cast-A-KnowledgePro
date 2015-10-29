using CastAKnowledgePros.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using System.Net;

namespace CastAKnowledgePros.Controllers
{
    public class HomeController : Controller
    {
        //CAKnowledgeDB _db = new CAKnowledgeDB();


        private VideoService _vidSerice = new VideoService();

        //private ApplicationDbContext db = new ApplicationDbContext();
        //private IVideoRepository _getAllVidsFromIVideoRepository;
        //private readonly VideoRepository myDb = new VideoRepository();
        //public VideoController(IVideoRepository getAllVidsFromIVideoRepository)
        //{
        //    _getAllVidsFromIVideoRepository = getAllVidsFromIVideoRepository;
        //}

        public HomeController()
        {
            //_getAllVidsFromIVideoRepository = myDb;
        }// parameterless constructor
        //[ChildActionOnly]
        //[OutputCache(CacheProfile = "Short")]
        public ActionResult AutoComplete(string term)
        {

            var _tempHolder = _vidSerice.GetAllVideos();


            var model = _tempHolder
                //.Where(v => v.VidTitle.ToLower().StartsWith(term.ToLower()))
                .Where(v => v.VidTitle.ToLower().Contains(term.ToLower()))
                .OrderByDescending(i => i.Id)
                .Take(4)
                .Select(vd => new
                {
                    label = vd.VidTitle
                });
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        //public ActionResult Search(string searchTerm)
        //{
        //    var _tempHolder = _vidSerice.GetAllVideos();
        //    var model = _tempHolder
        //        .OrderByDescending(i => i.Id)
        //        .Where(r => r.VidDescription == null || r.VidDescription.StartsWith(searchTerm))
        //        .Take(4);
        //    if (Request.IsAjaxRequest())
        //    {
        //        return PartialView("_VideoList", model);
        //    }
        //    return View(model.ToList());
        //}

        [OutputCache(CacheProfile ="Medium", VaryByHeader = "X-Requested-With", Location = System.Web.UI.OutputCacheLocation.Server)]
        public ActionResult VideoIndex(string pageSection, string searchTerm = null, int page = 1)
        {
            
            
            if (pageSection != null && Request.IsAjaxRequest())
            {
                if (pageSection.ToLower() == "espanol")
                {
                    var _temp = _vidSerice.GetPageSpanish(pageSection);
                    var model = _temp
                        .ToPagedList(page, 4);
                    return PartialView("_VideoList", model);
                }
                else
                {
                    var _temp = _vidSerice.GetPageEnglish(pageSection);
                    var model = _temp
                        .ToPagedList(page, 4);
                    return PartialView("_VideoList", model);
                }
            }// end of pagesection and is ajax
            else
            {
                var _tempHolder = _vidSerice.GetAllVideos();
                var model = _tempHolder
                    .OrderByDescending(i => i.VidAdded)
                    //.Where(r => searchTerm == null || r.VidTitle.ToLower().StartsWith(searchTerm.ToLower()))
                    .Where(r => searchTerm == null || r.VidTitle.ToLower().Contains(searchTerm.ToLower()))
                    .ToPagedList(page, 4);
                if (Request.IsAjaxRequest())
                {
                    return PartialView("_VideoList", model);
                }
                return View(model);
            }

        }// end of video index
        [Authorize]
        public ActionResult Admin()
        {
            var model = _vidSerice.GetAllVideos();
            return View(model);
        }

        // GET: Video
        //public ActionResult Index(string searchTerm = null, int page = 1)

        //{
        //    //var model = _db.MyVideos.ToList();
        //    //return View(model);


        //    var _tempHolder = _vidSerice.GetAllVideos();
        //    //return View(model.ToList());

        //    var model1 = _tempHolder
        //        .OrderByDescending(i => i.Id)
        //        .Where(r => searchTerm == null || r.VidTitle.ToLower().StartsWith(searchTerm.ToLower()) && r.VidLanguage == "Espanol")
        //        .ToPagedList(page, 4);

        //    if (Request.IsAjaxRequest())
        //    {
        //        return PartialView("_VideoList", model1);
        //    }
        //    return PartialView("_VideoList", model1);



        //    //VideoModel model = new VideoModel();
        //    //var models = _getAllVidsFromIVideoRepository.GetAllVideos().ToList();
        //    // _getAllVidsFromIVideoRepository.GetAllVideos();
        //    //return View(db.VideoModels.ToList());
        //    //return View(models);
        //    //List<VideoModel> model = new List<VideoModel>();
        //    //model = null; 
        //    //if (model == null)
        //    //{
        //    //    var models = _getAllVidsFromIVideoRepository.GetAllVideos();
        //    //        return View(models);
        //    //}

        //    //return RedirectToAction("Index", "Home");
        //}

        // GET: Video/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            //VideoModel videoModel = db.VideoModels.Find(id);
            //var temp = id.ToString();
            //VideoModel videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().Find(v => v.Id == id);
            VideoModel videoModel = _vidSerice.GetAllVideos().Find(v => v.Id == id);
            if (videoModel == null)
            {
                return HttpNotFound();
            }
            return View(videoModel);
        }

        // GET: Video/Create
        [Authorize]
        public ActionResult Create()
        {
            return View();
        }

        // POST: Video/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public ActionResult Create([Bind(Include = "Id,VidSource,VidTitle,VidDescription,VidCategory,VidAdded,VidLanguage")] VideoModel videoModel)
        {
            if (ModelState.IsValid)
            {
                //db.VideoModels.Add(videoModel);
                // db.SaveChanges();
                _vidSerice.CreateVid(videoModel);
                _vidSerice.SaveChanges();
                //_getAllVidsFromIVideoRepository.CreateVid(videoModel);
                // _getAllVidsFromIVideoRepository.SaveChanges();
                return RedirectToAction("VideoIndex");
            }

            return View(videoModel);
        }

        // GET: Video/Edit/5
        [Authorize]
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            //VideoModel videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().Find(v => v.Id == id);
            VideoModel videoModel = _vidSerice.GetAllVideos().Find(v => v.Id == id);
            if (videoModel == null)
            {
                return HttpNotFound();
            }
            return View(videoModel);
        }

        // POST: Video/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public ActionResult Edit([Bind(Include = "Id,VidSource,VidTitle,VidDescription,VidCategory,VidAdded,VidLanguage")] VideoModel videoModel)
        {
            if (ModelState.IsValid)
            {
                //db.Entry(videoModel).State = EntityState.Modified;
                //db.SaveChanges();
                //_getAllVidsFromIVideoRepository.EditEntityStateModified(videoModel);
                //_getAllVidsFromIVideoRepository.SaveChanges();
                _vidSerice.EditEntityStateModified(videoModel);
                _vidSerice.SaveChanges();
                return RedirectToAction("VideoIndex");
            }
            return View(videoModel);
        }

        // GET: Video/Delete/5
        [Authorize]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            //VideoModel videoModel = db.VideoModels.Find(id);
            //VideoModel videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().Find(v => v.Id == id);
            VideoModel videoModel = _vidSerice.GetAllVideos().Find(v => v.Id == id);
            if (videoModel == null)
            {
                return HttpNotFound();
            }
            return View(videoModel);
        }

        // POST: Video/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize]
        public ActionResult DeleteConfirmed(int id)
        {
            //VideoModel videoModel = db.VideoModels.Find(id);
            //VideoModel videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().Find(v => v.Id == id);
            VideoModel videoModel = _vidSerice.GetAllVideos().Find(v => v.Id == id);
            //db.VideoModels.Remove(videoModel);
            //_getAllVidsFromIVideoRepository.RemoveVid(videoModel);
            _vidSerice.RemoveVid(videoModel);
            //db.SaveChanges();
            //_getAllVidsFromIVideoRepository.SaveChanges();
            _vidSerice.SaveChanges();
            return RedirectToAction("VideoIndex");
        }

        public ActionResult ModernViewIndex()
        {
            var model = _vidSerice.GetAllVideos();
            return View(model.ToList());
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _vidSerice.Dispose();
                //_db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}