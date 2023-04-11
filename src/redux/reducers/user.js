const INITAL_STATE = {
  email: '',
};

const user = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_USER': {
    return {
      email: action.payload.email,
    };
  }
  default: return state;
  }
};

export default user;
