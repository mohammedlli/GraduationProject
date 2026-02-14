// Dashboard.jsx
 // SubjectCard.jsx
 

const SubjectCard = ({ title, subtitle, question, colorClass }) => {
  return (
    // 1. Outer Card: relative for positioning the absolute shape, rounded corners, and shadow
    <div className="relative w-72 h-80 overflow-hidden rounded-xl shadow-xl">
      
      {/* 2. Geometric Color Block Container */}
      {/* This uses 'transform' and '-skew-y-6' to create the slant */}
      <div className={`absolute top-0 left-0 w-full h-3/5 ${colorClass} transform -skew-y-6 origin-top-left`}>
        
        {/* Inner content for the color block - uses a positive skew to straighten the text */}
        <div className="absolute top-0 w-full p-5 pt-8 text-white skew-y-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm font-light mt-1 opacity-90">{subtitle}</p>
        </div>
      </div>
      
      {/* 3. White Content Area (The rest of the card) */}
      <div className="absolute bottom-0 w-full h-3/5 bg-white p-5 pt-12">
        <p className="text-gray-600 mb-6 text-sm">
          <span className="font-semibold">Question:</span> {question}
        </p>
        
        {/* Run Button Container */}
        <div className="flex justify-end">
          <button className="flex items-center justify-center w-20 h-7 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-full shadow-md transition duration-150">
            RUN
          </button>
        </div>
      </div>
    </div>
  );
};

 
export default UploadHomwork;
