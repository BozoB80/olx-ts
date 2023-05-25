'use client'

import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Button,
} from "@chakra-ui/react";

interface SortButtonProps {
  label: string;
  buttons: { label: string; onClick?: () => void }[];
  resetSorting: () => void;
  multiple?: boolean;
}

const SortButton: React.FC<SortButtonProps> = ({ label, buttons, resetSorting, multiple = true }) => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const initialLabel = label;

  const handleClick = (buttonLabel: string, onClick?: () => void) => {
    if (!multiple) {
      if (selectedLabels.includes(buttonLabel)) {
        // Reset the sorting if the button is already selected
        resetSorting();
        setSelectedLabels([]);
      } else {
        setSelectedLabels([buttonLabel]);
      }
      if (onClick) onClick();
    } else {
      if (selectedLabels.includes(buttonLabel)) {
        // Remove the label if already selected
        const updatedLabels = selectedLabels.filter((label) => label !== buttonLabel);
        setSelectedLabels(updatedLabels);
      } else {
        // Add the label if not already selected
        setSelectedLabels([...selectedLabels, buttonLabel]);
      }
      if (selectedLabels.length === 0) {
        resetSorting();
      }
      if (onClick) onClick();
    }
  };

  const isButtonActive = (buttonLabel: string) => {
    return selectedLabels.includes(buttonLabel);
  };

  return (
    <Popover>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              colorScheme={selectedLabels.length > 0 ? "red" : "gray.500"}
              _hover={{ backgroundColor: "black", textColor: "white" }}
              variant="outline"
              size="sm"
            >
              {selectedLabels.length > 0 ? selectedLabels.join(", ") : initialLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent w={{ base: "100vw", md: "initial" }}>
            <PopoverArrow />
            <PopoverBody display="grid" gridTemplateColumns="repeat(2, 1fr)" gridGap={2}>
              {buttons &&
                buttons.map((button, index) => {
                  const isActive = isButtonActive(button.label);

                  return (
                    <Button
                      key={index}
                      colorScheme={isActive ? "red" : "gray"}
                      variant="outline"
                      w="100%"
                      fontSize="sm"
                      size="sm"
                      _hover={{ backgroundColor: "black", textColor: "white" }}
                      {...(isActive && { textColor: "red.600", fontWeight: 'bold', border: '2px' })}
                      onClick={() => {
                        handleClick(button.label, button.onClick);
                        !multiple ? onClose() : ''
                      }}
                    >
                      {button.label}
                    </Button>
                  );
                })}
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default SortButton;
