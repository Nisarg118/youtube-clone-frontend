import React from "react";
const tags = [
  "All",
  "Music",
  "Food",
  "MMA",
  "Drama",
  "Hip hop",
  "Art",
  "Drawing",
  "Fiction",
  "Comedy",
  "Drama",
  "Web Development",
  "Artificial Intelligence",
  "Random Stuff",
];

const Tags = () => {
  return (
    <div>
      {/* Tags row */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex gap-4 px-4 py-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-100 whitespace-nowrap hover:bg-gray-300 rounded-lg text-[18px] font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
