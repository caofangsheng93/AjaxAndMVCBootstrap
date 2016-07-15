using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace AjaxAndBootstapInMVC.Models
{
    public class EmployeeDB
    {
        /// <summary>
        /// 连接字符串
        /// </summary>
        public string ConnectionString
        {
            get 
            {
                return ConfigurationManager.ConnectionStrings["DbConnectionString"].ConnectionString;
            }
        }

        /// <summary>
        /// 获取所有的Employee数据
        /// </summary>
        /// <returns></returns>
        public List<Employee> GetAllEmployeeList()
        {
            List<Employee> listEmp = new List<Employee>();

            //1.创建连接对象【连接字符串】
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            { 
               //2.创建命令对象
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "SelectEmployee";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = conn;//指定命令对象的连接通道

                //3.打开连接
                conn.Open();

                //4.发送命令
              SqlDataReader reader= cmd.ExecuteReader();

                //5.处理数据
              while (reader.Read())
              {
                  listEmp.Add(
                      new Employee() 
                      {
                          EmployeeID =Convert.ToInt32( reader["EmployeeID"]),
                          Name=reader["Name"].ToString(),
                          Age=Convert.ToInt32(reader["Age"]),
                          Country=reader["Country"].ToString(),
                          State=reader["State"].ToString()
                      });
              }
                //6.关闭连接
                //conn.Close();
                //reader.Close();
              return listEmp;
            }
        
        }

        /// <summary>
        /// 添加Employee
        /// </summary>
        /// <param name="emp"></param>
        /// <returns></returns>
        public int AddEmployee(Employee emp)
        {
            int result = 0;
            //1.创建连接对象【连接字符串】
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                //2创建命令对象
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "InsertOrUpdateEmployee";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = conn;

                //参数
                cmd.Parameters.AddWithValue("@Id", emp.EmployeeID);  //这里也需要

                cmd.Parameters.AddWithValue("@Name", emp.Name);
                cmd.Parameters.AddWithValue("@Age", emp.Age);
                cmd.Parameters.AddWithValue("@State", emp.State);
                cmd.Parameters.AddWithValue("@Country", emp.Country);
                cmd.Parameters.AddWithValue("@Action", "Insert");

                //3.打开连接
                conn.Open();

                //4.发送命令
               result= cmd.ExecuteNonQuery();

                //5.处理数据

                //6.关闭连接
            }
            return result;
        }


        /// <summary>
        /// 更新Employee
        /// </summary>
        /// <param name="emp"></param>
        /// <returns></returns>
        public int UpdateEmployee(Employee emp)
        {

            int result = 0;
            //1.创建连接对象【连接字符串】
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                //2创建命令对象
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "InsertOrUpdateEmployee";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = conn;

                //参数
                cmd.Parameters.AddWithValue("@ID", emp.EmployeeID);
                cmd.Parameters.AddWithValue("@Name", emp.Name);
                cmd.Parameters.AddWithValue("@Age", emp.Age);
                cmd.Parameters.AddWithValue("@State", emp.State);
                cmd.Parameters.AddWithValue("@Country", emp.Country);
                cmd.Parameters.AddWithValue("@Action", "Update");

                //3.打开连接
                conn.Open();

                //4.发送命令
                result = cmd.ExecuteNonQuery();

                //5.处理数据

                //6.关闭连接
            }
            return result;
        }

        /// <summary>
        /// 删除Employee
        /// </summary>
        /// <param name="emp"></param>
        /// <returns></returns>
        public int DeleteEmployee(int id)
        {
            int result = 0;
            //1.创建连接对象【连接字符串】
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                //2创建命令对象
                SqlCommand cmd = new SqlCommand();
                cmd.CommandText = "DeleteEmployee";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = conn;

                //参数
                cmd.Parameters.AddWithValue("@ID", id);
             
                //3.打开连接
                conn.Open();

                //4.发送命令
                result = cmd.ExecuteNonQuery();

                //5.处理数据

                //6.关闭连接
            }
            return result;
        
        }



    }
}