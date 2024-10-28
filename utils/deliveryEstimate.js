export const getDeliveryEstimate = (provider, pincode) => {
    const currentDate = new Date();
  
    switch (provider) {
      case 'Provider A':
        return calculateProviderADelivery(currentDate);
  
      case 'Provider B':
        return calculateProviderBDelivery(currentDate);
  
      case 'General Partners':
        return calculateGeneralPartnerDelivery(currentDate, pincode);
  
      default:
        return null;
    }
  };
  
  const calculateProviderADelivery = (currentDate) => {
    const cutoffTime = new Date(currentDate);
    cutoffTime.setHours(17, 0, 0, 0); // 5 PM cutoff
  
    if (currentDate < cutoffTime) {
      return { date: currentDate, sameDay: true };
    } else {
      return { date: new Date(currentDate.setDate(currentDate.getDate() + 1)), sameDay: false };
    }
  };
  
  const calculateProviderBDelivery = (currentDate) => {
    const cutoffTime = new Date(currentDate);
    cutoffTime.setHours(9, 0, 0, 0); // 9 AM cutoff
  
    if (currentDate < cutoffTime) {
      return { date: currentDate, sameDay: true };
    } else {
      return { date: new Date(currentDate.setDate(currentDate.getDate() + 1)), sameDay: false };
    }
  };
  
  const calculateGeneralPartnerDelivery = (currentDate, pincode) => {
    const deliveryDays = pincode.startsWith('1') ? 2 : 5; // Example: metro areas start with '1'
    return { date: new Date(currentDate.setDate(currentDate.getDate() + deliveryDays)), sameDay: false };
  };  