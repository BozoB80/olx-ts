"use client";

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
}

const SortButton: React.FC<SortButtonProps> = ({ label, buttons }) => {
  return (
    <Popover>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              colorScheme="gray.500"
              _hover={{ backgroundColor: "black", textColor: "white" }}
              variant="outline"
              size="sm"
            >
              {label}
            </Button>
          </PopoverTrigger>
          <PopoverContent w={{ base: "100vw", md: "initial" }}>
            <PopoverArrow />
            <PopoverBody
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gridGap={2}
            >
              {buttons &&
                buttons.map((button, index) => {
                  const handleClick = (onClick?: () => void) => {
                    if (onClick) {
                      onClick();
                    }
                    onClose();
                  };

                  return (
                    <Button
                      key={index}
                      colorScheme="gray.500"
                      variant="outline"
                      w="100%"
                      fontSize="sm"
                      size="sm"
                      _active={{ backgroundColor: "gray.700" }}
                      _hover={{ backgroundColor: "black", textColor: "white" }}
                      onClick={() => handleClick(button.onClick)}
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
