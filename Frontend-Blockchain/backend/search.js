const Property_Details = require('./model');

exports.searchPlaces = async(req,res)=>{
    Property_Details.find({City:req.params.search}).then(
        places=>{
            res.json(places);
        }
    ).catch(err=>{
        res.status(400).send(err);
    })
}