const Ticket = require('../models/schema');
const Company = require('../models/CompanySchema');

var k = 1;
// GET THE NAMES OF COMPANIES
exports.getAllTheCompanyNames = async (req, res) => {
    try {
  
      const enumValues = Ticket.schema.path('company').enumValues;
      await Company.deleteMany();
      let Data = [];
      k = 1;
  
      for (let i = 0; i < enumValues.length; i++) {
        const result = await Ticket.aggregate([
          {
            $match: {
              company: enumValues[i],
              type: 'client'
            }
          },
          {
            $group: {
              _id: "$company",
              employeeNames: {
                $push: {
                  id: "$_id",
                  name: "$employee"
                }
              }
            }
          }
        ]).exec();
  
        //   companyData.push({
        //   id: k ,
        //   company: enumValues[i],
        //   employeeNames: result[0].employeeNames
        // });
  
        let company = new Company({
          id: k,
          company: enumValues[i],
          employeeNames: result[0].employeeNames
        })
        k++;
        Data.push(company);
        await company.save();
  
      }
      return res.status(200).json({ Data });
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while storing the data' });
    }
  }