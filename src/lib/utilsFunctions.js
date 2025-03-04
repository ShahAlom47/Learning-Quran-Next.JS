 export const generateUniqueId = () => {
    // 4 ডিজিটের র্যান্ডম সংখ্যা
    const randomNum = Math.floor(1000 + Math.random() * 9000); 
    // বর্তমান বছর
    const currentYear = new Date().getFullYear();
    // ইউনিক ID তৈরি করা
    return `LQ${currentYear}${randomNum}`;
  };
  