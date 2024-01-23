const Company = require('../models/CompanySchema');

// GET THE EMPLOYEE DETAILS USING ID
exports.getAllTheNamesById = async (req, res) => {
    try {
        const id = req.params.id;
        const company = await Company.find({ id: id }).select('employeeNames').select('company');
        // console.log(company)
        if (company.length === 0) {
            return res.status(200).send("Incorrect data")
        }
        res.json({ company });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}