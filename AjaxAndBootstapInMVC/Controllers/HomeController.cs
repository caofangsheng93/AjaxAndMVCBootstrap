using AjaxAndBootstapInMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AjaxAndBootstapInMVC.Controllers
{
    public class HomeController : Controller
    {
        private EmployeeDB _context=null;
        public HomeController()
        {
        _context=new EmployeeDB();
        }
     
        public ActionResult Index()
        {
            return View();
            
        }
        public JsonResult List()
        {
            return Json(_context.GetAllEmployeeList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmployeeById(int id)
        {
            return Json(_context.GetAllEmployeeList().Find(x => x.EmployeeID == id), JsonRequestBehavior.AllowGet); 
        }

        [HttpPost]
        public JsonResult AddEmployee(Employee emp)
        {
            return Json(_context.AddEmployee(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateEmployee(Employee emp)
        {
            return Json(_context.UpdateEmployee(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteEmployee(int id)
        {
            return Json(_context.DeleteEmployee(id), JsonRequestBehavior.AllowGet);
        }
    }
}