import React from 'react';

function TestimonialComments() {
  const Testimonia = [
    {
      name: "John Doe",
      image: "", // Add image URL if available
      occupation: "CEO, ACME Exports",
      comment: `"T-Africa has been a game-changer for our business. We've been able to connect with new international buyers and grow our exports significantly."`,
    },
    {
      name: "Jane Smith",
      image: "", // Add image URL if available
      occupation: "Marketing Director, XYZ Ltd.",
      comment: `“I enjoy using T-Africa for Nigerian products. It’s easy to navigate, though shipping delays can happen. Customer service was helpful. Great overall!”`,
    },
    {
      name: "Michael Johnson",
      image: "", // Add image URL if available
      occupation: "Founder, MJ Ventures",
      comment: `“T-Africa makes sourcing African products easy and reliable. The variety is great, and the secure payment options give me confidence. Highly recommended!”`,
    },
  ];

  return (
    <div className='w-full py-8'>
      <div className='flex justify-between gap-6'>
        {Testimonia.map((testimonial, index) => (
          <div
            key={index}
            className='bg-[#F9F9F9] p-6 rounded-lg flex flex-col items-start gap-4 w-full'
          >
            {/* User Info Section */}
            <div className='flex items-center gap-4'>
              {/* Display user image if available */}
              {testimonial.image ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className='w-[36px] h-[36px] rounded-full object-cover'
                />
              ) : (
                <div className='w-[36px] h-[36px] rounded-full bg-[#D9D9D9]'></div> // Placeholder for missing image
              )}

              <div>
                <h3 className='font-bold text-sm'>{testimonial.name}</h3>
                <p className='text-sm text-black'>{testimonial.occupation}</p>
              </div>
            </div>

            {/* Comment Section */}
            <div>
              <p className='mt-2 text-base font-medium text-black'>{testimonial.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialComments;
