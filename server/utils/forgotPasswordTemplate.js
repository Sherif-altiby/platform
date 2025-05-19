const forgotPasswordTemplate = ({ name, code }) => {
    return `
          <p>Dear ${name}</p>    
          <p> You are requested a password reset. Please use following OTP code to reset you passowrd. <p>   
          <div> ${ code } </div>
          <p> This OTP is valid for 1 hour only. Enter this OTP in blinkit website to proceed with reseting your password <p>   
          </br>
          </br>
          <p> Thanks </p>
          <h4> Blinkit  </h4>
  `;
  };
  
  export default forgotPasswordTemplate;