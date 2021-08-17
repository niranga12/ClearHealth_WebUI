import NormalizePhone from "./NormalizePhone";

const EnableMaskPhone=(edit,inputValue)=>{
	// console.log(inputValue);
	
	return  edit &&  NormalizePhone(inputValue) ? true:false;
	

}

export default EnableMaskPhone;
