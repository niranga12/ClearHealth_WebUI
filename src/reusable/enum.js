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
	OrderAlreadyProcessed: 'OrderAlreadyProcessed',
	InvalidOrder: 'InvalidOrder',
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

export const DateFormat = {
	USFormat: 'MM-DD-YYYY',
};

export const ServiceType = {
	Types: [
		{value: '', text: 'Select'},
		{value: 1, text: 'Radiology'},
		{value: 2, text: 'OB/GYN'},
		{value: 3, text: 'Labs'},
		{value: 4, text: 'General Surgery'},
		{value: 5, text: 'Gastroenterology'},
		{value: 6, text: 'Cardiac Imaging'},
	],
};

export const selectionListDropDown = [
	{text: 'Select', value: ''},
	{text: 'Most Recent', value: 'recent'},
	{text: 'All', value: 'all'},
	{text: 'Deleted', value: 'deleted'},
];

export const ActiveList = [
	{text: 'Active', value: 'Active'},
	{text: 'Inactive', value: 'Inactive'},
];

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
	Pathology: 5,
};

export const Packages = [
	{name: 'Global Package', id: 1},
	{name: 'Facility', id: 2},
	{name: 'Physician', id: 3},
	{name: 'Anesthesia', id: 4},
	{name: 'Pathology', id: 5},
];

export const FacilityPackageField = [
	{text: 'Medicare Rate', value: 'medicareRate', id: 1},
	{text: 'Hospital Collection', value: 'hospitalCollectionFee', id: 2},
];

export const PhysicianPackageField = [
	{text: 'Medicare Rate', value: 'medicareRate', id: 1},
	{text: 'Physician Collection', value: 'physicianCollectionFee', id: 2},
];

export const EnhancementPercentage = [
	{text: '6.5%', value: '6.5'},
	{text: '15%', value: '15'},
];

export const HospitalTabList = {
	Orders: 0,
	Providers: 1,
	FeeSchedule: 2,
	Dashboard: 3,
	Payment: 4,
};
export const ContactMethod = {
	Email: 1,
	Phone: 2,
};

export const csvOptions = {
	fieldSeparator: ',',
	quoteStrings: '"',
	decimalSeparator: '.',
	showLabels: true,
	showTitle: false,
	// title: 'CSV',
	useTextFile: false,
	useBom: true,
	useKeysAsHeaders: true,

	// headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};

export const Roleclassificationtype = {
	SecurityRoles: 1,
	OrganizationRoles: 2,
	PersonRoles: 3,
};

export const ScreenPermissions = {
	Main:0,
	Home: 1,
	Hospital: 2,
	HealthSystem: 3,
	Providers: 4,
	PricingTool: 5,
	Orders: 6,
	Patients: 7,
	Accounting: 8,
	Profile: 9,
	UserManagement: 10,
};

export const ButtonPermissions = {
	AddHealthSystem: 20,
	EditHealthSystem: 21,
	DeleteHealthSystem: 22,
	AddProviders: 23,
	EditProviders: 24,
	DeleteProviders: 25,
	ViewProviderProcedures: 26,
	AddProviderProcedures: 27,
	AddHospital: 11,
	EditHospital: 12,
	DeleteHospital: 13,
	AddProvidersHospital: 16,
	AddPatient: 28,
	EditPatient: 29,
	DeletePatient: 30,
	AddUser: 31,
	EditUser: 32,
	DeleteUser: 33,

	OrdersTab: 14,
	ViewProvidersTab: 15,
	HospitalAddProviders: 16,
	FeeScheduleTab: 17,
	DashboardTab: 18,
	PaymentTab: 19,
	ViewHealthSystemHospital:34
};

export const ResourceType = {
	Page: 1,
	Button: 2,
	Controller: 3,
};

export const PermissionType = {
	View: 1,
	NotAuthorized: 2,
};

export const RoleType={

	ClearSystemAdmin:2,
	ClearAdmin:8,
	HealthSystemAdmin:9,
	HospitalAdmin:10,
	HospitalStaff:11

}

export const Provider={

	Provider:7,
	GroupProvider:13,
}

export const OrderType={
	ClearPackage:1,
	PatientResponsibility:2
}

export const HealthBenefitTabList = {
	OutofPocket:0,
	Deductible:1
};

export const HospitalInpatientTabList = {
	Copayment:0,
	Coinsurance:1,
	Deductible:2
};
	
	