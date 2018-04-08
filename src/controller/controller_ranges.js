'use strict';
var helper;
var api_response = {
    self:'',
    data:'',
    message:''
}

exports.setHelper=function(h){
    helper = h;
};

exports.getLastRange = function(req, res) {

    helper.getRangeList()
        .then(result => {

                api_response.data=result[0];
                api_response.self = req.originalUrl;
                res.json(api_response);
            },
        )
        .catch(err=>{
            api_response.data=[];
            api_response.self = req.originalUrl;
            api_response.message=err;
            res.json(api_response);
        });

};

exports.getRangeList=function(req,res){
    helper.getRangeList()
        .then(result => {

            api_response.data=result.map(function(item) {
                return JSON.parse(item)
            });
                api_response.self = req.originalUrl;
                res.json(api_response);
            },
        )
        .catch(err=>{
            api_response.data=[];
            api_response.self = req.originalUrl;
            api_response.message=err;
            res.json(api_response);
        });
}
exports.getRange = function(req,res){
    let key = req.params.range;
    helper.getRange(key)
        .then(result => {

                api_response.data=result;
                api_response.self = req.originalUrl;
                res.json(api_response);
            },
        )
        .catch(err=>{
            api_response.data=[];
            api_response.self = req.originalUrl;
            api_response.message=err;
            res.json(api_response);
        });
};
