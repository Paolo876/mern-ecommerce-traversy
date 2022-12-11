export default ({address1, address2, city, state, zip5}) => {
    return encodeURIComponent(`<AddressValidateRequest USERID="${process.env.REACT_APP_USPS_USERNAME}"><Revision>1</Revision><Address><Address1>${address1}</Address1><Address2>${address2}</Address2><City>${city}</City><State>${state}</State><Zip5>${zip5}</Zip5><Zip4></Zip4></Address></AddressValidateRequest>`)
}