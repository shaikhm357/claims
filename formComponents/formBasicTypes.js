const claimIntimatedBy = {
  type: 'string',
  title: 'Claim Intimated By',
  enum: [],
  enumNames: []
}
const insuranceCompany = {
  type: 'string',
  enum: [],
  enumNames: []
}
const verificaitonThrough = {
  type: 'string',
  enum: [],
  enumNames: []
}
const intimatorName = {
  type: 'string'
}
const intimatorContactNumber = {
  type: 'integer'
}
const intimatorEmailId = {
  type: 'string',
  title: 'Intimator Email Id'
}
const verifyRegisteredMobileNo = {
  type: 'string'
}
const AuthenticationRequired = {
  type: 'object',
  properties: {}
}
const otp = {
  type: 'string'
}
const policyNumber = {
  type: 'string'
}
const nameOfLifeAssured = {
  type: 'string'
}
const nameOfProposer = {
  type: 'string'
}
const claimReportingPersonName = {
  type: 'string'
}
const claimType = {
  type: 'string',
  enum: [],
  enumNames: []
}
const claimReason = {
  type: 'string',
  enum: [],
  enumNames: []
}
const dateOfBirthOfLifeAssured = {
  type: 'string'
}
const dateOfEvent = {
  type: 'string'
}
const causeOfEvent = {
  type: 'string'
}
const nameOfNominee = {
  type: 'string'
}
const nameOfclaimant = {
  type: 'string'
}
const relationshipWithLifeAssured = {
  type: 'string',
  enum: [],
  enumNames: []
}
const emailIdOfClaimant = {
  type: 'string'
}
const mobileNoOfClaimant = {
  type: 'string'
}
const addressOfClaimant = {
  type: 'string'
}
const pinCode = {
  type: 'string'
}
const cityArea = {
  type: 'string',
  enum: [],
  enumNames: []
}
const district = {
  type: 'string',
  enum: [],
  enumNames: []
}
const state = {
  type: 'string',
  enum: [],
  enumNames: []
}
const country = {
  type: 'string',
  enum: [],
  enumNames: []
}

module.exports = {
  claimIntimatedBy,
  insuranceCompany,
  verificaitonThrough,
  intimatorName,
  intimatorContactNumber,
  intimatorEmailId,
  verifyRegisteredMobileNo,
  AuthenticationRequired,
  policyNumber,
  nameOfLifeAssured,
  nameOfProposer,
  claimReportingPersonName,
  claimType,
  claimReason,
  dateOfBirthOfLifeAssured,
  dateOfEvent,
  causeOfEvent,
  nameOfNominee,
  nameOfclaimant,
  relationshipWithLifeAssured,
  emailIdOfClaimant,
  mobileNoOfClaimant,
  addressOfClaimant,
  pinCode,
  cityArea,
  district,
  state,
  country,
  otp
}
