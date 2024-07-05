Note:- Please create database on your mysql server before starting the application refer .env for database name and configuration.

To post '(http://localhost:4500/api/identify)' use body as json format like below:
{
    "email":"email@example.com",
    "phoneNumber":"123456"
}

Note:- (http://localhost:4500/api/contacts) this route is protected by admin access;
Please register yourself by going to route: (http://localhost:4500/auth/registerAdmin)
{
   "username":"admin@gmail.com",
   "password":"12345"
}
if you are already registered
login  by on route : (http://localhost:4500/auth/loginAdmin)
{
    "username":"admin@gmail.com",
   "password":"12345"
}

Both the routes will give you response of access token and grab it use it access '/api/contacts'

To get or serach contacts use '(http://localhost:4500/api/contacts)' and for specific search use email or phoneNumber query in the url;