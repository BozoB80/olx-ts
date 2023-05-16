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

const steps = [
  { title: "GENERAL", description: "General Info", content: <div>Step 1 Content</div> },
  { title: "MANDATORY", description: "And optional info", content: <div>Step 2 Content</div> },
  { title: "IMAGE", description: "Insert image", content: <div>Step 3 Content</div> },
];

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);

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

      <Box height={"container.sm"} mt={4}>{steps[activeStep].content}</Box>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button small label="Back" onClick={handleBack} isDisabled={activeStep === 0} />          
        <Button small label={activeStep === steps.length - 1 ? "Finish" : "Next"} onClick={handleNext} />          
      </Box>
    </Box>
  );
};

export default StepperForm;
