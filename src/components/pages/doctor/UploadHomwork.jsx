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

 
const UploadHomework = () => {
  return (
    // Main screen container with a light background and subtle gradient at the top
    <div className="min-h-screen p-8 bg-gray-50">

      {/* Header Section */}
      <header className="flex justify-between items-center px-4 py-3 mb-10 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-400 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white tracking-wider">
          EDU-FLOW
        </h1>
        <button className="bg-purple-800 hover:bg-purple-900 text-white font-medium py-2 px-5 rounded-lg shadow-md transition duration-150">
          ADD HOMEWORK
        </button>
      </header>
      
      {/* Cards Container (Uses Flexbox for horizontal layout) */}
      <div className="flex justify-center space-x-8">
        
        {/* Math Card (Blue) */}
        <SubjectCard 
          title="Math Exercises"
          subtitle="Algebra & Geometry practice problems."
          question="Solve for x: 2(x + 4) = 18"
          colorClass="bg-blue-500" 
        />
        
        {/* Science Card (Green) */}
        <SubjectCard 
          title="Science Quiz"
          subtitle="Biology & Chemistry review"
          question="What is the powerhouse of the cell?"
          colorClass="bg-green-500" 
        />
        
        {/* History Card (Orange) */}
        <SubjectCard 
          title="History Essay"
          subtitle="World War II analysis"
          question="Causes and effects of WWII?"
          colorClass="bg-orange-500" 
        />
      </div>
    </div>
  );
};

export default UploadHomework;