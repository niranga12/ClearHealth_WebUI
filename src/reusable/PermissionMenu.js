import React from 'react'

const PermissionMenu = (screenId,permissionList) => {
    
    let selectedScreen= permissionList.find(screen =>screen.resourceId==screenId);
    return selectedScreen? true:false;
   
}

export default PermissionMenu;
