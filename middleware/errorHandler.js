export const notFound = (req,res,next) =>{
    res.status(404).json({error:'Route not found'});
};

export const errorHandler = (err,req,res,next) =>{
    console.log(err.stack);
    res.status(err.status || 500).json({
        error:err.message || 'Internal Server Error',
    });
};

