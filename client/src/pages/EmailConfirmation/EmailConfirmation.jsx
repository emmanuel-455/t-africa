import React, { useRef } from 'react';
import { useAtom } from 'jotai';
import { codeAtom } from '../../redux/Store';
import Logo from '../../components/Logo';
import FormFooter from '../../components/FormFooter';

const EmailConfirmation = () => {
  const [code, setCode] = useAtom(codeAtom); // Jotai atom for managing code state

  // Refs for each input field
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) { // Allow only single digits or empty values
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode); // Update the atom state with the full code

      if (value) { // Move focus to the next input field if value is not empty
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      } else if (index > 0) { // Move focus to the previous input field if value is empty
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className='bg-[#F6F7FA] w-full min-h-screen flex flex-col items-center justify-center'>
      <Logo />

      <div className='bg-[#ffffff] w-[420px] px-[50px] flex flex-col m-auto rounded-[19px] shadow-lg py-[45px]'>
        <h2 className='font-bold text-[42px] text-start mb-[20px]'>Confirm it’s you</h2>
        <p className='leading-[19px] font-[500] text-[#1F2937]'>
          Enter the code sent to your email chidaluugwu03@gmail.com
        </p>

        <div className='flex justify-between my-[40px]'>
          {code.map((digit, index) => (
            <input
              key={index}
              type='text'
              maxLength='1'
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && digit === '' && index > 0) {
                  // Move focus to the previous input when Backspace is pressed and current input is empty
                  inputRefs.current[index - 1].focus();
                }
              }}
              ref={el => inputRefs.current[index] = el} // Assign ref to each input
              className='w-[47px] h-[53px] text-center text-[32px] border-b-2 border-gray-300 focus:outline-none'
            />
          ))}
        </div>

        <button className='w-full bg-[#06C569] text-white py-[12px] rounded-[10px] font-bold text-[16px]'>
          Confirm
        </button>
      </div>

      <FormFooter />
    </div>
  );
};

export default EmailConfirmation;
