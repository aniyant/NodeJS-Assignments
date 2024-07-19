const role = (roles) => {
    return function (req, res, next) {
    //   console.log("req.sessiON",req.session.role);
      // we have to get the current user role
      // what is expected role for this route
  
      if (roles.includes(req.user.role)) {
        next();
      } else {
       return  res
          .status(401)
          .json({ message: "you are not authorizatied to access this route" });
      }
    };
  };
  
  module.exports = role;