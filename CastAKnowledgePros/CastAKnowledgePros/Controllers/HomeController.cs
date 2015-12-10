using CastAKnowledgePros.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using System.Net;
using CastAKnowledgePros.IRepository;
using CastAKnowledgePros.Repository;

namespace CastAKnowledgePros.Controllers
{
    public class HomeController : Controller
    {
        //CAKnowledgeDB _db = new CAKnowledgeDB();

        private IVideoRepository _getAllVidsFromIVideoRepository;
        private readonly VideoRepository myDb = new VideoRepository();
        //private VideoService _vidSerice = new VideoService();

        public HomeController()
        {
            _getAllVidsFromIVideoRepository = myDb;
        }// parameterless constructor
        //[ChildActionOnly]
        //[OutputCache(CacheProfile = "Short")]
        public ActionResult AutoComplete(string term)
        {
            return Json(_getAllVidsFromIVideoRepository.AutoComplete(term).Select(vd => new {label = vd.VidTitle }), JsonRequestBehavior.AllowGet);
            //return Json(_vidSerice.AutoComplete(term).Select(vd => new {label = vd.VidTitle }), JsonRequestBehavior.AllowGet);
        }

        [OutputCache(CacheProfile = "short", VaryByHeader = "X-Requested-With", Location = System.Web.UI.OutputCacheLocation.Server)]
        public ActionResult VideoIndex(string pageSection, string searchTerm = null, int page = 1)
        {
            if (pageSection != null && Request.IsAjaxRequest())
            {
                if (pageSection.ToLower() == "espanol")
                {
                    //return PartialView("_VideoList", _vidSerice.GetPageSpanish(pageSection, page));
                    return PartialView("_VideoList", _getAllVidsFromIVideoRepository.GetPageSpanish(pageSection, page));
                }
                else
                {
                    //return PartialView("_VideoList", _vidSerice.GetPageEnglish(pageSection, page));
                    return PartialView("_VideoList", _getAllVidsFromIVideoRepository.GetPageEnglish(pageSection, page));
                }
            }// end of pagesection and is ajax
            else
            {
                if (Request.IsAjaxRequest())
                {
                    //return PartialView("_VideoList", _vidSerice.GetAllVideos(searchTerm,page));
                    return PartialView("_VideoList", _getAllVidsFromIVideoRepository.GetAllVideos(searchTerm, page));
                }
                //return View(_vidSerice.GetAllVideos(searchTerm, page));
                return View(_getAllVidsFromIVideoRepository.GetAllVideos(searchTerm, page));
            }

        }// end of video index
        [Authorize]
        public ActionResult Admin()
        {
            //return View(_vidSerice.GetAllVideos());
            return View(_getAllVidsFromIVideoRepository.GetAllVideos());
        }

        // GET: Video


        // GET: Video/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            //var videoModel = _vidSerice.GetAllVideos().ToList().Find(v => v.Id == id);
            var videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().ToList().Find(v => v.Id == id);

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
                //_vidSerice.CreateVid(videoModel);
                //_vidSerice.SaveChanges();
                _getAllVidsFromIVideoRepository.CreateVid(videoModel);
                _getAllVidsFromIVideoRepository.SaveChanges();
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
            //VideoModel videoModel = _vidSerice.GetAllVideos().ToList().Find(v => v.Id == id);
            VideoModel videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().ToList().Find(v => v.Id == id);

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
                //_vidSerice.EditEntityStateModified(videoModel);
                //_vidSerice.SaveChanges();
                _getAllVidsFromIVideoRepository.EditEntityStateModified(videoModel);
                _getAllVidsFromIVideoRepository.SaveChanges();
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
            //VideoModel videoModel = _vidSerice.GetAllVideos().ToList().Find(v => v.Id == id);
            VideoModel videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().ToList().Find(v => v.Id == id);
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
            //VideoModel videoModel = _vidSerice.GetAllVideos().ToList().Find(v => v.Id == id);
            VideoModel videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().ToList().Find(v => v.Id == id);
            //_vidSerice.RemoveVid(videoModel);
            //_vidSerice.SaveChanges();
            _getAllVidsFromIVideoRepository.RemoveVid(videoModel);
            _getAllVidsFromIVideoRepository.SaveChanges();
            return RedirectToAction("VideoIndex");
        }

        public ActionResult ModernViewIndex()
        {
            //return View(_vidSerice.GetAllVideos());
            return View(_getAllVidsFromIVideoRepository.GetAllVideos());
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                //_vidSerice.Dispose();
                _getAllVidsFromIVideoRepository.Dispose(disposing);
                //_db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}