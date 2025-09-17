export const isLoggedIn = () => {
  const expireDateStr = localStorage.getItem('auto-expires');
  if (expireDateStr) {
    const expireDate = new Date(expireDateStr);
    const now = Date.now();

    // safe
    if (now < expireDate.getTime()) return true;
  }

  return false;
}

export const setLoginCreds = () => {
  const expire = new Date();
  expire.setMonth(expire.getMonth() + 1);
  localStorage.setItem('auto-expires', expire.toISOString());
}
