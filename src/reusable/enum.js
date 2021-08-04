 export const PartyTypeEnum={
    primary : 1,
    shipping :2,
    telecommunicationsNumber:3,
}


export const TableSettingsEnum={
    ItemPerPage:5
}

export const ValidationPatterns={
     phoneRegExp : /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
     onlyCharacters : /^[a-zA-Z ]*$/,
     zip : /^[0-9]{5}(?:-[0-9]{4})?$/,
     phoneFormatReg:/^\D*(\{0,3})\D*(\d{0,3})\D*(\d{0,4})/
    // phoneFormatReg: /^[1-9]*$/
}

export const ServiceMsg={
        Added: "Added",
        Updated: "Updated",
        Deleted: "Deleted",
        OK: "OK",
        AuthFailed: "AuthFailed",
        ServerError: "ServerError",
        InvalidRequest: "InvalidRequest",
    
  
}
export const MaskFormat={
    phoneNumber: "(999) 999 - 9999"
}


export const Organizations={
	Organization:1,
	SuperUser:2,
	HealthSystem:3,
	PrimaryContact:4,
	Hospital:5,
	PaymentContact:6,
	Provider:7
}

export const  OrderStatus={
    	Ordered:1,
    	Pending:2,
    	Completed:3,
    	Cancelled:4
}

export const Country={
    USA:220
}

