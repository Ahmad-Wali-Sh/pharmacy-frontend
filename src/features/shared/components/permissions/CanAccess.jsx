import { useUserPermissions } from "../../states/useUserPermissions";

const CanAccess = ({ permission, children }) => {
    const { userPermissions } = useUserPermissions();
  
    if (!userPermissions.includes(permission)) {
      return null;
    }
  
    return children;
  };

export default CanAccess