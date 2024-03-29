'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SortButtonProps {
  label: string;
  buttons: { label: string; onClick?: () => void }[];
  resetSorting: () => void;
  multiple?: boolean;
}

const SortButton: React.FC<SortButtonProps> = ({ label, buttons, resetSorting, multiple = true }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [toggled, setToggled] = useState(false)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const initialLabel = label;

  const buttonRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setToggled(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name.toLowerCase(), value.toLowerCase());
  
    return params.toString();
  }, [searchParams]);



  const handleClick = (buttonLabel: string, onClick?: () => void) => {
    if (!multiple) {
      if (selectedLabels.includes(buttonLabel)) {
        // Reset the sorting if the button is already selected
        resetSorting()
        setSelectedLabels([]);
        const params = new URLSearchParams(searchParams.toString());
      params.delete(label.toLowerCase());
      router.push(pathname + '?' + params.toString());
      } else {
        setSelectedLabels([buttonLabel]);
      }
      if (selectedLabels.length === 0) {
        resetSorting();
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
              ref={buttonRef}
              colorScheme={selectedLabels.length > 0 ? "red" : "gray.500"}
              _hover={{ backgroundColor: "black", textColor: "white" }}
              variant="outline"
              size="sm"
              gap="4px"
              onClick={() => setToggled(prev => !prev)}
            >
              {selectedLabels.length > 0 ? selectedLabels.join(", ") : initialLabel}
              {toggled ? <ChevronUpIcon className='w-4 h-4 transition-all' /> : <ChevronDownIcon className='w-4 h-4 transition-all' />}
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
                        !multiple ? onClose() : '';
                        router.push(pathname + '?' + createQueryString(label.toLowerCase(), button.label.toLowerCase()))
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
