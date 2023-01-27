const { Schema, model} = require ('mongoose');
const rolesEnum = require('../configs/roles.enum');

const UserScheme = new Schema({
  firstName:{ type: String, trim: true, default: '' },
  lastName:{ type: String, trim: true, default: '' } ,
  email: { type: String, trim: true, lowercase: true, required: true, unique: true },
  password: { type: String, min: 6,lowercase: false, required: true, select: false},
  age: {type: Number, min: 0, max: 99},
  role: {type: String, enum: Object.values(rolesEnum), default: rolesEnum.USER}
},
{
  timestamps: true,
  versionKey: false,
  toJSON: {virtuals: true},
  toObject: {virtuals: true} 
});

module.exports = model('User', UserScheme);

