export const regexConfig = {
  user: {
    name: /^([A-Z][a-z]{1,20}|[A-Z][a-z]{1,20} [A-Z][a-z]{1,20})$/,
    login: /^[a-zA-Z0-9 \-\_]{4,20}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
  },
  passCollection: {
    name: /^[a-zA-Z0-9 \-\_&]{1,20}$/,
  },
  role: {
    name: /^[A-z][a-z]{1,20}$/,
  },
};
