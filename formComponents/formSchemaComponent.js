const { claimConstants } = require('../constant')
const { mergeProperties } = require('../utils/index')
const assign = require('lodash/assign')
// const formBasicTypes = require('./formBasicTypes')

class FormSchemaComponent {
  constructor(formBasicTypes) {
    this.formBasicTypes = formBasicTypes
  }
  prepareIntimationSchema() {
    const schema = {
      type: 'object',
      ...mergeProperties({
        claimIntimatedBy: assign({ title: claimConstants.CLAIM_INTIMATED_BY }, this.formBasicTypes.dropDownOrRadio),
        insuranceCompany: assign({ title: claimConstants.INSURANCE_COMPANY }, this.formBasicTypes.dropDownOrRadio),
        intimatorDetails: {
          type: 'object',
          title: claimConstants.INTIMATOR_DETAILS,
          properties: {
            verificaitonThrough: assign({ title: claimConstants.VERIFICATION_THROUGH }, this.formBasicTypes.dropDownOrRadio),
            intimatorName: assign({ title: claimConstants.INTIMATOR_NAME }, this.formBasicTypes.input),
            intimatorContactNumber: assign({ title: claimConstants.INTIMATOR_CONTACT_NUMBER }, this.formBasicTypes.input),
            intimatorEmailId: assign({ title: claimConstants.INTIMATOR_EMAIL_ID }, this.formBasicTypes.input)
          }
        },
        verifyRigisteredMobileNo: assign({ title: claimConstants.VERIFY_REGISTERED_MOBILE_NUMBER }, this.formBasicTypes.input),
        authenticationRequired: {
          type: 'object',
          title: claimConstants.AUTHENTICATION_REQUIRED,
          properties: { otp: assign({ title: claimConstants.ENTER_OTP }, this.formBasicTypes.input) }
        },
        claimIntimatationDetail: {
          type: 'object',
          title: claimConstants.CLAIM_INTIMATION_DETAILS,
          properties: {
            insuranceCompany: assign({ title: claimConstants.INSURANCE_COMPANY }, this.formBasicTypes.dropDownOrRadio),
            policyNumber: assign({ title: claimConstants.POLICY_NUMBER }, this.formBasicTypes.input),
            nameOfLifeAssured: assign({ title: claimConstants.NAME_OF_LIFE_ASSURED }, this.formBasicTypes.input),
            nameOfProposer: assign({ title: claimConstants.NAME_OF_PROPOSER }, this.formBasicTypes.input),
            claimReportingPersonName: assign({ title: claimConstants.CLAIM_REPORTING_PERSON_NAME }, this.formBasicTypes.input),
            claimType: assign({ title: claimConstants.CLAIM_TYPE }, this.formBasicTypes.dropDownOrRadio),
            claimReason: assign({ title: claimConstants.CLAIM_REASON }, this.formBasicTypes.dropDownOrRadio),
            dateOfBirthOfLifeAssured: assign({ title: claimConstants.DATE_OF_BIRTH_OF_LIFE_ASSURED }, this.formBasicTypes.input),
            dateOfEvent: assign({ title: claimConstants.DATE_OF_EVENT }, this.formBasicTypes.input),
            causeOfEvent: assign({ title: claimConstants.CAUSE_OF_EVENT }, this.formBasicTypes.input),
            nameOfNominee: assign({ title: claimConstants.NAME_OF_NOMINEE }, this.formBasicTypes.input),
            nameOfclaimant: assign({ title: claimConstants.NAME_OF_CLAIMANT }, this.formBasicTypes.input),
            relationshipWithLifeAssured: assign({ title: claimConstants.RELATIONSHIP_WITH_LIFE_ASSURED }, this.formBasicTypes.dropDownOrRadio),
            emailIdOfClaimant: assign({ title: claimConstants.EMAIL_ID_OF_CLAIMANT }, this.formBasicTypes.input),
            mobileNoOfClaimant: assign({ title: claimConstants.MOBILE_NO_OF_CLAIMANT }, this.formBasicTypes.input),
            addressOfClaimant: assign({ title: claimConstants.ADDRESS_OF_CLAIMANT }, this.formBasicTypes.input),
            pinCode: assign({ title: claimConstants.PIN_CODE }, this.formBasicTypes.input),
            cityArea: assign({ title: claimConstants.CITY_AREA }, this.formBasicTypes.dropDownOrRadio),
            district: assign({ title: claimConstants.DISTRICT }, this.formBasicTypes.dropDownOrRadio),
            state: assign({ title: claimConstants.STATE }, this.formBasicTypes.dropDownOrRadio),
            country: assign({ title: claimConstants.COUNTRY }, this.formBasicTypes.dropDownOrRadio)
          }
        },
        claimRegistration: {
          type: 'object',
          title: claimConstants.CLAIM_REGISTRATION,
          properties: {
            claimType: assign({ title: claimConstants.CLAIM_TYPE }, this.formBasicTypes.dropDownOrRadio),
            claimReason: assign({ title: claimConstants.CLAIM_REASON }, this.formBasicTypes.dropDownOrRadio)
          }
        }
      })
    }
    const uiSchema = {
      'ui:order': [
        'claimIntimatedBy',
        'insuranceCompany',
        'intimatorDetails',
        'verifyRigisteredMobileNo',
        'authenticationRequired',
        'claimIntimatationDetail',
        'claimRegistration'
      ],
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
      rules: [
        {
          conditions: {
            claimIntimatedBy: { is: 'Proposer' }
          },
          event: {
            type: 'remove',
            params: {
              field: 'intimatorDetails'
            }
          }
        },
        {
          conditions: {
            claimIntimatedBy: 'empty'
          },
          event: {
            type: 'remove',
            params: {
              field: 'intimatorDetails'
            }
          }
        }
      ]
    }
  }

  prepareDocUploadSchema() {
    const schema = {
      type: 'object',
      ...mergeProperties({
        originalPolicyDocument: assign({ title: claimConstants.ORIGINAL_POLICY_DOCUMENT }, this.formBasicTypes.file),
        deathCertificate: assign({ title: claimConstants.DEATH_CERTIFICATE }, this.formBasicTypes.file),
        copyOfCancelledChequeOrBankAccountPassbook: assign(
          { title: claimConstants.COPY_OF_CANCELLED_CHEQUE_OR_BANK_ACCOUNT_PASSBOOK },
          this.formBasicTypes.file
        ),
        nomineeClaimantPhotoIdentityAddressProof: assign(
          { title: claimConstants.NOMINEE_CLAIMANT_PHOTO_IDENTITY_ADDRESS_PROOF },
          this.formBasicTypes.file
        ),
        deathInHospital: assign({ title: claimConstants.DEATH_CERTIFICATE }, this.formBasicTypes.dropDownOrRadio),
        copyOfMedicalRecords: assign(
          { title: claimConstants.COPY_OF_MEDICAL_RECORDS_ADMISSION_NOTES_DISCHARGE_DEATH_SUMMARY_TEST_REPORTS_ETC },
          this.formBasicTypes.file
        ),
        attendingPhysiciansStatement: assign({ title: claimConstants.ATTENDING_PHYSICIANS_STATEMENT_FORM }, this.formBasicTypes.file),
        employerCertificate: assign({ title: claimConstants.EMPLOYER_CERTIFICATE }, this.formBasicTypes.file),

        FIROrPanchnamaPoliceComplaint: assign({ title: claimConstants.FIR_OR_PANCHNAMA_POLICE_COMPLAINT }, this.formBasicTypes.file),
        postMortemReport: assign({ title: claimConstants.POST_MORTEM_REPORT }, this.formBasicTypes.file),
        finalPoliceInvestigationReport: assign({ title: claimConstants.FINAL_POLICE_INVESTIGATION_REPORT }, this.formBasicTypes.file),
        criticalIllnessClaimForm: assign({ title: claimConstants.CRITICAL_ILLNESS_CLAIM_FORM }, this.formBasicTypes.file),
        attestedCopiesOfMedicalRecordsIndoorPapersOfTheHospital: assign(
          { title: claimConstants.ATTESTED_COPIES_OF_MEDICAL_RECORDS_INDOOR_PAPERS_OF_THE_HOSPITAL },
          this.formBasicTypes.file
        ),
        hospitalDischargeSummary: assign({ title: claimConstants.HOSPITAL_DISCHARGE_SUMMARY }, this.formBasicTypes.file),
        hospitalBills: assign({ title: claimConstants.HOSPITAL_BILLS }, this.formBasicTypes.file),
        disabilityBenefitClaimForm: assign({ title: claimConstants.DISABILITY_BENEFIT_CLAIM_FORM }, this.formBasicTypes.file),
        firstInformationReportFIRInCase: assign({ title: claimConstants.FIRST_INFORMATION_REPORT_FIR_IN_CASE }, this.formBasicTypes.file),
        hospitalAndSurgicalCareClaimForm: assign({ title: claimConstants.HOSPITAL_AND_SURGICAL_CARE_CLAIM_FORM }, this.formBasicTypes.file),
        maturityDischargeVoucherInTheFormatSharedByTheInsurerAlongWithIntimation: assign(
          { title: claimConstants.MATURITY_DISCHARGE_VOUCHER_IN_THE_FORMAT_SHARED_BY_THE_INSURER_ALONG_WITH_INTIMATION },
          this.formBasicTypes.file
        )
      })
    }
    const uiSchema = {
      'ui:order': [
        'originalPolicyDocument',
        'deathCertificate',
        'copyOfCancelledChequeOrBankAccountPassbook',
        'nomineeClaimantPhotoIdentityAddressProof',
        'deathInHospital',
        'copyOfMedicalRecords',
        'attendingPhysiciansStatement',
        'employerCertificate',
        'FIROrPanchnamaPoliceComplaint',
        'postMortemReport',
        'finalPoliceInvestigationReport',
        'criticalIllnessClaimForm',
        'attestedCopiesOfMedicalRecordsIndoorPapersOfTheHospital',
        'hospitalDischargeSummary',
        'hospitalBills',
        'disabilityBenefitClaimForm',
        'firstInformationReportFIRInCase',
        'hospitalAndSurgicalCareClaimForm',
        'maturityDischargeVoucherInTheFormatSharedByTheInsurerAlongWithIntimation'
      ],
      deathInHospital: {
        'ui:widget': 'radio',
        'ui:options': {
          inline: true
        }
      }
    }
    return {
      schema,
      uiSchema,
      rules: [
        {
          conditions: {
            deathInHospital: { is: 'No' }
          },
          event: {
            type: 'remove',
            params: {
              field: ['copyOfMedicalRecords', 'attendingPhysiciansStatement', 'employerCertificate']
            }
          }
        },
        {
          conditions: {
            deathInHospital: 'empty'
          },
          event: {
            type: 'remove',
            params: {
              field: ['copyOfMedicalRecords', 'attendingPhysiciansStatement', 'employerCertificate']
            }
          }
        }
      ]
    }
  }
}
module.exports = FormSchemaComponent

// const testSchema = new FormSchemaComponent(formBasicTypes)
// console.log(JSON.stringify(testSchema.prepareClaimSchema(), null, 2))
