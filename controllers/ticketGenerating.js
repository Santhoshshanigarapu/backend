const Ticket = require('../models/schema');

// GENERATE THE TICKET RAISED
exports.generateTicket = async (req, res) => {
    try {
      let payload = req.body;
      if (payload.type === 'client') {
        const ticket = new Ticket({
          type: payload.type,
          company: payload.company,
          employee: payload.employee,
          topic: payload.topic,
          title: payload.title,
          message: payload.message,
          status: payload.status,
          comment_count: payload.comment_count,
          view_count: payload.view_count,
          label: payload.label,
          priority: payload.priority,
          assignee: payload.assignee,
          reporter: payload.reporter,
          sprint: payload.sprint,
          Fix_version: payload.Fix_version,
          original_estimate: payload.original_estimate,
          components: payload.components,
          ticketId: payload.ticketId
        })
        if (req.file) {
          ticket.image = req.file.path;
        }
        Ticket.updateMany({}, { $set: { newField: true } }, { upsert: false, multi: true });
        await ticket.save();
  
        let data = {
          message: "Ticket generated Successfully",
          status: '201',
          type: payload.type,
          status: payload.status,
          image: ticket.image
        }
        return res.status(201).json({ data });
      }
  
      else if (payload.type === 'internal') {
        const ticket = new Ticket({
          type: payload.type,
          admin: payload.admin,
          topic: payload.topic,
          title: payload.title,
          message: payload.message,
          status: payload.status,
          comment_count: payload.comment_count,
          view_count: payload.view_count,
          label: payload.label,
          priority: payload.priority,
          assignee: payload.assignee,
          reporter: payload.reporter,
          sprint: payload.sprint,
          Fix_version: payload.Fix_version,
          original_estimate: payload.original_estimate,
          components: payload.components,
          ticketId: payload.ticketId
        })
        await ticket.save();
        let data = {
          message: "Ticket generated Successfully",
          status: '201',
          type: payload.type,
          status: payload.status
        }
        return res.status(201).json({ data });
      }
  
      else {
        return res.status(400).json({ message: "Invalid Ticket Type" })
      }
    }
    catch (err) {
      return res.status(400).send(err);
    }
  }