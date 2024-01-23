const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    type: {
       type: String,
       enum: ['client','internal']
    },
    company: {
        type: String,
        enum: ['Ahex','TCS','Accenture','Infosys','IBM'],
        default: 'Ahex'
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
  },
    admin: {
        type: String,
        enum: ['Admin','Team Lead','HR'],
        default: 'Admin'
    },
    employee: {
        type: String,
        enum: ['Asif','Amit','Navya','Shubham','Anil','Puja','Faiyyaz','Varsha','Akash','Santosh']
    },
    topic: {
        type: String,
        enum: ['Tech','HR','Business Payment','Business'],
    },
    title: {
        type: String,
    },
    message: {
        type: String,
    },
   status: {
    type:String,
    enum: ['unassigned', 'assigned', 'resolved'],
    default: 'unassigned'
  },
  comment_count: {
    type: String,
  },
  view_count: {
    type: String,
  },
  label: {
    type: String,
    enum: ['UI','API','Admin_Account','Supervisor','User_Account','Language_Translation','New_User_Guide','Reopen'],
    default: 'API'
  }, 
  priority: {
    type: String,
    enum:['high','low','medium'],
    default: 'low'
  }, 
  assignee: {
    type: String,
  },
  reporter: {
    type: String,
  },
    
  sprint: {
    type: String,
  },
  Fix_version: {
    type: String,
  },
  original_estimate: {
    type: String,
  },
  components: {
    type: String,
  },
  ticketId: {
    type: String
  },
  image: {
    type: String
  }
},
  {
   timestamps: true
  }
)

const TicketSchema = mongoose.model('TicketSchema' , ticketSchema );
module.exports = TicketSchema;