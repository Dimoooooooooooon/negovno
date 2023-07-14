import mongoose from 'mongoose';

const profitSchema = mongoose.Schema({
    year: String,
    quarter: String,
    spend: String,
    income: String,
    rent: String,
    payday: String,
    misc: String,
    value: String,
})

var ProfitMessage = mongoose.model('profit', profitSchema);

export default ProfitMessage;