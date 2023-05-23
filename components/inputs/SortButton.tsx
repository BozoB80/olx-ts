'use client'

import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from '@chakra-ui/react'

interface SortButtonProps {
  label?: string
  onClick?: () => void
}

const SortButton: React.FC<SortButtonProps> = ({ label, onClick }) => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    if (toggle) {
      setToggle(true)

    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button>{label}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Button backgroundColor={'gray.300'}>Cheapest</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default SortButton;