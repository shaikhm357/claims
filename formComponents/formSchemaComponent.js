const { claimConstants } = require('../constant')
const { mergeProperties } = require('../utils/index')
const assign = require('lodash/assign')
// const formBasicTypes = require('./formBasicTypes')

class FormSchemaComponent {
  constructor(formBasicTypes) {
    this.formBasicTypes = formBasicTypes
  }
  prepareClaimSchema() {
    const schema = {
      type: 'object',
      ...mergeProperties({
        claimIntimatedBy: assign({ title: claimConstants.CLAIM_INTIMATED_BY }, this.formBasicTypes.claimIntimatedBy),
        insuranceCompany: assign({ title: claimConstants.INSURANCE_COMPANY }, this.formBasicTypes.insuranceCompany),
        intimatorDetails: {
          type: 'object',
          title: claimConstants.INTIMATOR_DETAILS,
          properties: {
            verificaitonThrough: assign({ title: claimConstants.VERIFICATION_THROUGH }, this.formBasicTypes.verificaitonThrough),
            intimatorName: assign({ title: claimConstants.INTIMATOR_NAME }, this.formBasicTypes.intimatorName),
            intimatorContactNumber: assign({ title: claimConstants.INTIMATOR_CONTACT_NUMBER }, this.formBasicTypes.intimatorContactNumber),
            intimatorEmailId: assign({ title: claimConstants.INTIMATOR_EMAIL_ID }, this.formBasicTypes.intimatorEmailId)
          }
        },
        verifyRigisteredMobileNo: assign({ title: claimConstants.VERIFY_REGISTERED_MOBILE_NUMBER }, this.formBasicTypes.verifyRegisteredMobileNo),
        authenticationRequired: {
          type: 'object',
          title: claimConstants.AUTHENTICATION_REQUIRED,
          properties: { otp: assign({ title: claimConstants.ENTER_OTP }, this.formBasicTypes.otp) }
        },
        claimIntimatationDetail: {
          type: 'object',
          title: claimConstants.CLAIM_INTIMATION_DETAILS,
          properties: {
            insuranceCompany: assign({ title: claimConstants.INSURANCE_COMPANY }, this.formBasicTypes.insuranceCompany),
            policyNumber: assign({ title: claimConstants.POLICY_NUMBER }, this.formBasicTypes.policyNumber),
            nameOfLifeAssured: assign({ title: claimConstants.NAME_OF_LIFE_ASSURED }, this.formBasicTypes.nameOfLifeAssured),
            nameOfProposer: assign({ title: claimConstants.NAME_OF_PROPOSER }, this.formBasicTypes.nameOfProposer),
            claimReportingPersonName: assign({ title: claimConstants.CLAIM_REPORTING_PERSON_NAME }, this.formBasicTypes.claimReportingPersonName),
            claimType: assign({ title: claimConstants.CLAIM_TYPE }, this.formBasicTypes.claimType),
            claimReason: assign({ title: claimConstants.CLAIM_REASON }, this.formBasicTypes.claimReason),
            dateOfBirthOfLifeAssured: assign({ title: claimConstants.DATE_OF_BIRTH_OF_LIFE_ASSURED }, this.formBasicTypes.dateOfBirthOfLifeAssured),
            dateOfEvent: assign({ title: claimConstants.DATE_OF_EVENT }, this.formBasicTypes.dateOfEvent),
            causeOfEvent: assign({ title: claimConstants.CAUSE_OF_EVENT }, this.formBasicTypes.causeOfEvent),
            nameOfNominee: assign({ title: claimConstants.NAME_OF_NOMINEE }, this.formBasicTypes.nameOfNominee),
            nameOfclaimant: assign({ title: claimConstants.NAME_OF_CLAIMANT }, this.formBasicTypes.nameOfclaimant),
            relationshipWithLifeAssured: assign(
              { title: claimConstants.RELATIONSHIP_WITH_LIFE_ASSURED },
              this.formBasicTypes.relationshipWithLifeAssured
            ),
            emailIdOfClaimant: assign({ title: claimConstants.EMAIL_ID_OF_CLAIMANT }, this.formBasicTypes.emailIdOfClaimant),
            mobileNoOfClaimant: assign({ title: claimConstants.MOBILE_NO_OF_CLAIMANT }, this.formBasicTypes.mobileNoOfClaimant),
            addressOfClaimant: assign({ title: claimConstants.ADDRESS_OF_CLAIMANT }, this.formBasicTypes.addressOfClaimant),
            pinCode: assign({ title: claimConstants.PIN_CODE }, this.formBasicTypes.pinCode),
            cityArea: assign({ title: claimConstants.CITY_AREA }, this.formBasicTypes.cityArea),
            district: assign({ title: claimConstants.DISTRICT }, this.formBasicTypes.district),
            state: assign({ title: claimConstants.STATE }, this.formBasicTypes.state),
            country: assign({ title: claimConstants.COUNTRY }, this.formBasicTypes.country)
          }
        },
        claimRegistration: {
          type: 'object',
          title: claimConstants.CLAIM_REGISTRATION,
          properties: {
            claimType: assign({ title: claimConstants.CLAIM_TYPE }, this.formBasicTypes.claimType),
            claimReason: assign({ title: claimConstants.CLAIM_REASON }, this.formBasicTypes.claimReason)
          }
        }
      })
    }
    const uiSchema = {
      claimIntimatedBy: {
        'ui:widget': 'radio'
      },
      insuanceCompany: {
        'ui:widget': 'select'
      },
      verifyRigisteredMobileNo: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Registered Mobile Number'
      },
      AuthenticationRequired: {
        otp: {
          'ui:widget': 'password'
        }
      },
      claimIntimatationDetail: {
        insuranceCompany: {
          'ui:widget': 'select'
        },
        policyNumber: {
          'ui:widget': 'text'
        },
        nameOfLifeAssured: {
          'ui:widget': 'text'
        },
        nameOfProposer: {
          'ui:widget': 'text'
        },
        claimReportingPersonName: {
          'ui:widget': 'text'
        },
        claimtype: {
          'ui:widget': 'select'
        },
        claimReason: {
          'ui:widget': 'select'
        },
        dateOfBirthOfLifeAssured: {
          'ui:widget': 'date'
        },
        dateOfEvent: {
          'ui:widget': 'date'
        },
        causeOfEvent: {
          'ui:widget': 'text'
        },
        nameOfNominee: {
          'ui:widget': 'text'
        },
        nameOfclaimant: {
          'ui:widget': 'text'
        },
        relationshipWithLifeAssured: {
          'ui:widget': 'select'
        },
        emailIdOfClaimant: {
          'ui:widget': 'email'
        },
        mobileNoOfClaimant: {
          'ui:widget': 'text'
        },
        addressOfClaimant: {
          'ui:widget': 'text'
        },
        pinCode: {
          'ui:widget': 'text'
        },
        cityArea: {
          'ui:widget': 'select'
        },
        district: {
          'ui:widget': 'select'
        },
        state: {
          'ui:widget': 'select'
        },
        country: {
          'ui:widget': 'select'
        }
      },
      claimRegistration: {
        claimType: {
          'ui:widget': 'select'
        },
        claimReason: {
          'ui:widget': 'select'
        }
      }
    }

    return {
      schema,
      uiSchema,
      rules: []
    }
  }
}

module.exports = FormSchemaComponent

// const testSchema = new FormSchemaComponent(formBasicTypes)
// console.log(JSON.stringify(testSchema.prepareClaimSchema(), null, 2))
