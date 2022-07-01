import NormalizePhone from './NormalizePhone'

const EnableMaskPhone = (edit, inputValue) => {
  return edit && NormalizePhone(inputValue) ? true : false
}

export default EnableMaskPhone
