/* eslint-disable eqeqeq */

const PermissionButton = (screenId, buttonId, permissionList) => {
  let selectedScreen = permissionList.find((screen) => screen.resourceId == screenId)
  if (selectedScreen?.childResource.length > 0) {
    let res = selectedScreen.childResource.find((x) => x.resourceId == buttonId)
    return res ? true : false
  } else {
    return false
  }
}

export default PermissionButton
