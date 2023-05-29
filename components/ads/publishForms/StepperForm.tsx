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
  useToast,
} from "@chakra-ui/react";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { useRouter } from "next/navigation";


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
  const toast = useToast()
  const router = useRouter()

  const steps = [
    { title: "GENERAL", description: "General Info", content: <Step1 title1={title1} body1={body1} /> },
    { title: "MANDATORY", description: "And optional info", content: <Step2 title2={title2} body2={body2} /> },
    { title: "IMAGE", description: "Insert image", content: <Step3 title3={title3} body3={body3} /> },
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onSubmit();
      toast({ position: 'top', status: 'success', title: 'You successfully published an ad'})
      console.log("Form submitted!");
      router.push('/')
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      return
    }
    setActiveStep((prevStep) => prevStep - 1);    
  };

  return (
    <Box px={4}>
      <Stepper index={activeStep} pb={2}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <div className="hidden sm:block">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </div>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Box height={"container.sm"} bgColor={"gray.100"} py={{ base: '0', md: '4'}}>{steps[activeStep].content}</Box>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button small label="Back" onClick={handleBack} isDisabled={activeStep === 0} />          
        <Button small label={activeStep === steps.length - 1 ? "Finish" : "Next"} onClick={handleNext} />          
      </Box>
    </Box>
  );
};

export default StepperForm;

// Step 1
type Step1Props = {
  title1: string
  body1: React.ReactElement
}

const Step1: React.FC<Step1Props> = ({ title1, body1 }) => {
  return (
    <div className="max-w-4xl mx-auto h-full bg-white px-1 sm:px-8 py-4 rounded-md overflow-y-auto">
      <Heading title={title1} center nobold />
      <div className="relative flex-auto">
        {body1}
      </div>
    </div>
  );
}

// Step 2
type Step2Props = {
  title2: string
  body2: React.ReactElement
}

const Step2: React.FC<Step2Props> = ({ title2, body2 }) => {
  return (
    <div className="max-w-4xl mx-auto h-full bg-white px-1 sm:px-8 py-4 rounded-md overflow-y-auto">
      <Heading title={title2} center nobold />
      <div className="relative flex-auto">
        {body2}
      </div>
    </div>
  );
}

// Step 3
type Step3Props = {
  title3: string
  body3: React.ReactElement
}

const Step3: React.FC<Step3Props> = ({ title3, body3 }) => {
  return (
    <div className="max-w-4xl mx-auto h-full bg-white px-1 sm:px-8 py-4 rounded-md overflow-y-auto">
      <Heading title={title3} center nobold />
      <div className="relative flex-auto">
        {body3}
      </div>
    </div>
  );
}
