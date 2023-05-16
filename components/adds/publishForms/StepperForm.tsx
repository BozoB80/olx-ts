'use client'

import { useState } from "react";
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import Button from "@/components/Button";
import Heading from "@/components/Heading";



interface StepperProps {
  onSubmit: () => void
  title1: string
  title2: string
  title3: string
  body1: React.ReactElement
  body2: React.ReactElement
  body3: React.ReactElement
}

const StepperForm: React.FC<StepperProps> = ({ onSubmit, title1, title2, title3, body1, body2, body3 }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "GENERAL", description: "General Info", content: <Step1 title1={title1} body1={body1} /> },
    { title: "MANDATORY", description: "And optional info", content: <div>Step 2 Content</div> },
    { title: "IMAGE", description: "Insert image", content: <div>Step 3 Content</div> },
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Finish button was clicked
      // Perform any necessary actions or submit the form
      console.log("Form submitted!");
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Box p={4}>
      <Stepper index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <div>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </div>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Box height={"container.sm"} bgColor={"gray.100"} py={4} mt={4}>{steps[activeStep].content}</Box>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button small label="Back" onClick={handleBack} isDisabled={activeStep === 0} />          
        <Button small label={activeStep === steps.length - 1 ? "Finish" : "Next"} onClick={handleNext} />          
      </Box>
    </Box>
  );
};

export default StepperForm;

type Step1Props = {
  title1: string
  body1: React.ReactElement
}

const Step1: React.FC<Step1Props> = ({ title1, body1 }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white px-8 py-4 rounded-md">
      <Heading title={title1} center nobold />
      <div className="relative flex-auto">
        {body1}
      </div>

    </div>
  );
}
