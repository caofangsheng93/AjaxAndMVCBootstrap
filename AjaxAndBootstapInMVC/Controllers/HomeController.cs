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
            //这里后面的查询使用FInd,也可以使用where,但注意要加上FirstOrDefault返回单一实体
            return Json(_context.GetAllEmployeeList().Where(x => x.EmployeeID == id).FirstOrDefault(), JsonRequestBehavior.AllowGet); 
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