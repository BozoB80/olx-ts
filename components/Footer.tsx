'use client'

import { PhoneIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import Container from "./Container";
import { footerInfo } from "@/utils/footerInfo";
import appstore from '../assets/appstore.svg'
import googlestore from '../assets/googlestore.svg'
import Image from "next/image";

const Footer = () => {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center z-10">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start p-2 sm:p-0 gap-5 sm:gap-16">
          {footerInfo.map((info, i) => (
            <ul key={i} className="w-full space-y-2">
              <li className="font-medium text-sm">{info.title}</li>
              {info.links.map((link, i) => (
                <li key={i} className="text-sm font-light cursor-pointer">{link}</li>
              ))}
            </ul>              
          ))}
          <Button label="User Support" icon={<PhoneIcon className="w-5 h-5" />} small />
          <div className="w-full flex flex-col justify-center items-start sm:items-center gap-5">
            <Image src={appstore} alt="appstore" width={120} height={120} className="cursor-pointer" />
            <Image src={googlestore} alt="googlestore" width={120} height={120} className="cursor-pointer" />
          </div>
        </div>

        <div className="w-full text-start px-2 sm:px-0 py-3">
          <h1 className="font-light text-md">Copyright © OLX-bb {new Date().getFullYear()}. All rights reserved.</h1>
        </div>          
      </div>
    </Container>
  );
}

export default Footer;