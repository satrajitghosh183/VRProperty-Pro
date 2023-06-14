const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    Price:{
        type: Number,
        min: -2147483648, 
        max: 2147483647, 
        
    },
    Area:{
        type: Number,
        min: -2147483648, 
        max: 2147483647, 
        
    },
    Location:{
        type: String,
        
    },
  
    MaintenanceStaff:{
        type: Number,
        min: -2147483648, 
        max: 2147483647, 
        
    },
  
    PowerBackup:{
        type: Number,
        min: -2147483648, 
        max: 2147483647, 
        
    },
    CarParking:{
        type: Number,
        min: -2147483648, 
        max: 2147483647, 
        
    },
    StaffQuarter:{
        type: Number,
        min: -2147483648, 
        max: 2147483647, 
        
    },

    City:{
        type: String,
        
    },
   
})
const Property_Details = mongoose.model("Property_Details",UserSchema);
module.exports=Property_Details;