const Ticket = require('../models/schema');
const Topic = require('../models/topicSchema');

// GET ALL THE TOPICS LIST
exports.getAllTheTopics = async (req, res) => {
    try {
      let topicList, k = 1;
      const distinctTopics = await Ticket.distinct('topic');
      await Topic.deleteMany();
  
      for (let i = 0; i < distinctTopics.length; i++) {
        topicList = new Topic({
          name: distinctTopics[i],
          id: k
        })
        k++;
        await topicList.save();
      }
      const list = await Topic.find();
      return res.status(200).json({ list });
    }
    catch (err) {
      return res.status(400).json(err.message);
    }
  
  }
  