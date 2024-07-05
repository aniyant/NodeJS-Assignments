// validate middleware
// middleware/validateRequest.js

function validateRequest(req, res, next) {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;
    
    if (typeof ID !== 'number') {
        return res.status(400).send('bad request. some data is incorrect. Note: ID should be a number.');
    }
    if (typeof Name !== 'string') {
        return res.status(400).send('bad request. some data is incorrect. Note: Name should be a string.');
    }
    if (typeof Rating !== 'number') {
        return res.status(400).send('bad request. some data is incorrect. Note: Rating should be a number.');
    }
    if (typeof Description !== 'string') {
        return res.status(400).send('bad request. some data is incorrect. Note: Description should be a string.');
    }
    if (typeof Genre !== 'string') {
        return res.status(400).send('bad request. some data is incorrect. Note: Genre should be a string.');
    }
    if (!Array.isArray(Cast) || !Cast.every(c => typeof c === 'string')) {
        return res.status(400).send('bad request. some data is incorrect. Note: Cast should be an array of strings.');
    }

    next();
}

module.exports = {validateRequest} ;

// const validateRequest = (req,res,next)=>{
//     const { ID, Name, Rating, Description, Genre, Cast } = req.body;
    
//     if (!req.body.ID || typeof req.body.ID !== 'number') {
//         return res.status(400).send('bad request. some data is incorrect. Note: ID should be a number.');
//     }
//     if (!req.body.Name || typeof req.body.Name !== 'string') {
//         return res.status(400).send('bad request. some data is incorrect. Note: Name should be a string.');
//     }
//     if (!req.body.Rating || typeof req.body.Rating !== 'number') {
//         return res.status(400).send('bad request. some data is incorrect. Note: Rating should be a number.');
//     }
//     if (!req.body.Description || typeof req.body.Description !== 'string') {
//         return res.status(400).send('bad request. some data is incorrect. Note: Description should be a string.');
//     }
//     if (!req.body.Genre || typeof req.body.Genre !== 'string') {
//         return res.status(400).send('bad request. some data is incorrect. Note: Genre should be a string.');
//     }
//     if (!req.body.Cast || !Array.isArray(req.body.Cast) || !req.body.Cast.every(c => typeof c === 'string')) {
//         return res.status(400).send('bad request. some data is incorrect. Note: Cast should be an array of strings.');
//     }

//     next();
// }

// module.exports = {
//     validateRequest
// }