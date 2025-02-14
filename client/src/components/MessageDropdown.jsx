import { useState } from 'react';
import { Link } from 'react-router-dom';
import Message from "../assets/messageIcon.svg"; // Import the message icon

const MessageDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown on click
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  // Example messages data
  const messages = [
    { sender: 'John Doe', content: 'We would like to place a bulk order for your product.', timestamp: '2 hours ago' },
    { sender: 'Jane Smith', content: 'Can you provide more details about shipping costs?', timestamp: '1 day ago' },
    { sender: 'Mark Johnson', content: 'Interested in collaborating on a new project.', timestamp: '3 days ago' }
  ];

  return (
    <div>
      <button 
        className='flex py-[6px] font-medium cursor-pointer text-[14px] md:gap-[5px] lg:gap-[8px]' 
        onClick={toggleDropdown} // Dropdown toggles on click
      >
        <div className='relative'>
          <img src={Message} alt="Messages" className='lg:w-[35px] md:w-[35px] w-[40px]' />
          {messages.length > 0 && (
            <div className='absolute bottom-[17px] left-4 bg-red-500 text-white rounded-full text-[10px] w-[16px] h-[16px] flex items-center justify-center'>
              {messages.length}
            </div>
          )}
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute lg:right-[150px] right-[4px] mt-2 w-[80vw] md:w-[320px] bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className='p-4 border-b'>
            <h3 className='text-lg md:text-base font-semibold'>Messages</h3>
          </div>
          <div className='max-h-60 md:max-h-80 overflow-y-auto'>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <Link
                  to={`/message/${index}`}
                  key={index}
                  className='block p-4 hover:bg-gray-100'
                >
                  <div className='flex justify-between items-center'>
                    <h4 className='text-sm font-bold'>{message.sender}</h4>
                    <span className='text-xs text-gray-400'>{message.timestamp}</span>
                  </div>
                  <p className='text-sm text-gray-600'>{message.content}</p>
                </Link>
              ))
            ) : (
              <div className='p-4 text-sm text-center text-gray-500'>
                No new messages
              </div>
            )}
          </div>
          <div className='p-4 border-t'>
            <Link to='/messages' className='text-sm text-blue-600'>
              View All Messages
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageDropdown;
