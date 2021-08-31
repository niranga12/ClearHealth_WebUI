export const PartyTypeEnum = {
	primary: 1,
	shipping: 2,
	telecommunicationsNumber: 3,
};

export const TableSettingsEnum = {
	ItemPerPage: 5,
};

export const ValidationPatterns = {
	phoneRegExp: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
	onlyCharacters: /^[a-zA-Z ]*$/,
	zip: /^[0-9]{5}(?:-[0-9]{4})?$/,
	phoneFormatReg: /^\D*(\{0,3})\D*(\d{0,3})\D*(\d{0,4})/,
	// phoneFormatReg: /^[1-9]*$/
};

export const ServiceMsg = {
	Added: 'Added',
	Updated: 'Updated',
	Deleted: 'Deleted',
	OK: 'OK',
	AuthFailed: 'AuthFailed',
	ServerError: 'ServerError',
	InvalidRequest: 'InvalidRequest',
};
export const MaskFormat = {
	phoneNumber: '(999) 999 - 9999',
};

export const Organizations = {
	Organization: 1,
	SuperUser: 2,
	HealthSystem: 3,
	PrimaryContact: 4,
	Hospital: 5,
	PaymentContact: 6,
	Provider: 7,
};

export const OrderStatus = {
	Ordered: 1,
	Pending: 2,
	Completed: 3,
	Cancelled: 4,
};

export const Country = {
	USA: 220,
};

export const CurrencyDetail = {
	USA: '$',
};

export const ServiceType = {
	Types: [
		{ value: '', text: 'Select' },
		{ value: 1, text: 'Radiology' },
		{ value: 2, text: 'OB/GYN' },
		{ value: 3, text: 'Labs' },
		{ value: 4, text: 'General Surgery' },
		{ value: 5, text: 'Gastroenterology' },
		{ value: 6, text: 'Cardiac Imaging' },
	],
};

export const selectionListDropDown = [
	{ text: 'Select', value: '' },
	{ text: 'Most Recent', value: 'recent' },
	{ text: 'All', value: 'all' },
	{ text: 'Delete', value: 'deleted' },
]

export const ActiveList=[
		{ text: 'Active', value: 'Active' },
		{ text: 'Inactive', value: 'Inactive' },	
]

export const ServiceTypeEnum = {
	Radiology: 1,
	OBGYN: 2,
	Labs: 3,
	GeneralSurgery: 4,
	Gastroenterology: 5,
	CardiacImaging: 6,
};


export const PackageItems = {
	GlobalPackage: 1,
	Facility: 2,
	Physician: 3,
	Anesthesia: 4,
	Pathology: 5


}




export const Packages = [
	{ name: "Global Package", id: 1 },
	{ name: "Facility", id: 2 },
	{ name: "Physician", id: 3 },
	{ name: "Anesthesia", id: 4 },
	{ name: "Pathology", id: 5 }
]


export const FacilityPackageField = [

	{ text: "Medicare Rate", value: "medicareRate", id: 1 },
	{ text: "Hospital Collection", value: "hospitalCollectionFee", id: 2 }
]

export const PhysicianPackageField = [
	{ text: "Medicare Rate", value: "medicareRate", id: 1 },
	{ text: "Physician Collection", value: "physicianCollectionFee", id: 2 }
]

export const EnhancementPercentage = [
	{ text: "6.5%", value: "6.5" },
	{ text: "15%", value: "15" }
]

export const HospitalTabList={
	Orders:0,
	Providers:1,
	FeeSchedule:2,
	Dashboard:3,
	Payment:4


}