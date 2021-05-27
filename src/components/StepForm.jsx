import React, { useState } from 'react';
import Otpverify from './Otpverify';
import PhoneInput from './PhoneInput';

const StepForm = () => {
	

	const [step, setStep] = useState(1)
	
	const nextStep = () => {
       if(step===1 || step===2)
		setStep(prevStep => prevStep + 1)
	};

	const prevStep = () => {
		if(step===1 || step===2)
		setStep(prevStep => prevStep - 1)
	};
	
	switch (step) {
		case 1:
			return <PhoneInput nextStep={nextStep}/>;
		case 2:
            return <Otpverify prevStep={prevStep}/>;
        default:
            return <PhoneInput nextStep={nextStep}/>  
            
    }
};

export default StepForm;