USE  master 
GO 
IF EXISTS (SELECT * FROM sysdatabases WHERE name='EmployeeDB')
BEGIN 
DROP DATABASE EmployeeDB
END 
GO 
CREATE DATABASE EmployeeDB
GO 
USE EmployeeDB
GO 

IF EXISTS (SELECT * FROM sysobjects WHERE name='Employee')
BEGIN 
DROP TABLE Employee
END 
GO 
CREATE TABLE Employee
(
EmployeeID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
Name NVARCHAR(50) NOT NULL,
Age INT ,
[State] NVARCHAR(50),
Country NVARCHAR(50)
)



--创建查询Employee的存储过程
CREATE PROCEDURE SelectEmployee
AS 
BEGIN 
SELECT * FROM dbo.Employee;
END 


--插入或者更新
CREATE PROCEDURE InsertOrUpdateEmployee
(
@ID int, 
@Name nvarchar(50),
@Age int,
@State nvarchar(50),
@Country nvarchar(50),
@Action nvarchar(10)
)
AS 
BEGIN
IF @Action='Insert'
BEGIN 
INSERT INTO dbo.Employee
        ( Name, Age, [State], Country )
VALUES  ( @Name, -- Name - nvarchar(50)
          @Age, -- Age - int
          @State, -- State - nvarchar(50)
          @Country  -- Country - nvarchar(50)
          );
END 
IF @Action='Update'
BEGIN 
UPDATE dbo.Employee
SET Name=@Name,
Age=@Age,
[State]=@State,
Country=@Country
WHERE EmployeeID=@ID;
END 

END


CREATE PROCEDURE DeleteEmployee
(
@ID int
)
AS 
BEGIN
 DELETE FROM  dbo.Employee WHERE EmployeeID=@ID;
END




