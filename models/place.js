const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema(
    {
        place_type:{
            type: String,
        },
        city:{
            type:String,
            required: true
        },
        postal_code:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        place_description:{
            type:String,
            required:true
        },
        max_capacity:{
            type:Number,
            required:true
        },
        schedules:{
            monday:{
                opening_time:{
                    type: String
                },
                closing_time:{
                    type:String
                }
            },
            tuesday:{
                opening_time:{
                    type: String
                },
                closing_time:{
                    type:String
                }
            },
            wednseday:{
                opening_time:{
                    type: String
                },
                closing_time:{
                    type:String
                }
            },
            thursday:{
                opening_time:{
                    type: String
                },
                closing_time:{
                    type:String
                }
            },
            friday:{
                opening_time:{
                    type: String
                },
                closing_time:{
                    type:String
                }
            },
            saturday:{
                opening_time:{
                    type: String
                },
                closing_time:{
                    type:String
                }
            },
            sunday:{
                opening_time:{
                    type: String
                },
                closing_time:{
                    type:String
                }
            }
        }        
    },
    {timestamps:true}
);

module.exports = mongoose.model("Place", placeSchema);