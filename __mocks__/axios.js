const response = {
  data: {
    user: {
      uid: 'someuid',
      email: 'someemail',
      photoURL: 'somephotourl',
      displayName: 'somedisplayName',
      phoneNumber: 'somePhoneNumber'
    }
  }
};

const axios = {
  post: () => (
        Promise.resolve(response)
  )
};

export default axios;
