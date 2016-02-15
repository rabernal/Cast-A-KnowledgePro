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
using System.Net.Http.Headers;

namespace CastAKnowledgePros.Controllers
{
    public class HomeController : Controller
    {

        private IVideoRepository _getAllVidsFromIVideoRepository;
        private readonly VideoRepository myDb = new VideoRepository();
        //private VideoService _vidSerice = new VideoService();

        public HomeController()
        {
            _getAllVidsFromIVideoRepository = myDb;
        }// parameter less constructor

        public ActionResult AutoComplete(string term)
        {
            return Json(_getAllVidsFromIVideoRepository.AutoComplete(term).Select(vd => new { label = vd.VidTitle }), JsonRequestBehavior.AllowGet);
            
        }
        
        [OutputCache(CacheProfile = "short", VaryByHeader = "X-Requested-With", Location = System.Web.UI.OutputCacheLocation.ServerAndClient)]
        public ActionResult VideoIndex(string pageSection , string searchTerm = null, int page = 1)
        {
            
            string searchT = (searchTerm == null) ? searchTerm : searchTerm.ToLower();
            string pageS = (pageSection == null) ? pageSection : pageSection.ToLower();
            if (pageSection != null && Request.IsAjaxRequest())
            {
                if (pageS == "espanol")
                {
                    return PartialView("_VideoList", _getAllVidsFromIVideoRepository.GetPageSpanish(pageS, page).ToPagedList(page, 6));
                }
                else
                {
                    return PartialView("_VideoList", _getAllVidsFromIVideoRepository.GetPageEnglish(pageS, page).ToPagedList(page, 6));
                }
            }// end of page section and is Ajax
            else
            {
                if (Request.IsAjaxRequest())
                {
                    return PartialView("_VideoList", _getAllVidsFromIVideoRepository.GetAllVideos(searchT, page).ToPagedList(page, 6));
                }

 
                return View(_getAllVidsFromIVideoRepository.GetAllVideos(searchT, page).ToPagedList(page, 6));


            }

        }// end of video index
        [Authorize]
        public ActionResult Admin()
        {
            return View(_getAllVidsFromIVideoRepository.GetAllVideos());
        }

        // GET: Video/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().Where(i => i.Id == id).FirstOrDefault();


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
            var videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().Where(i => i.Id == id).FirstOrDefault();

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
            var videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().Where(i => i.Id == id).FirstOrDefault();
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
            var videoModel = _getAllVidsFromIVideoRepository.GetAllVideos().Where(i => i.Id == id).FirstOrDefault();
            _getAllVidsFromIVideoRepository.RemoveVid(videoModel);
            _getAllVidsFromIVideoRepository.SaveChanges();
            return RedirectToAction("VideoIndex");
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