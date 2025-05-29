import React from "react";

const Comment = () => {
  return (
    <div>
      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <img
                src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                className="w-9 h-9 rounded-full object-cover"
                alt="User"
              />
              <div>
                <p className="text-sm font-medium">User #{i + 1}</p>
                <p className="text-sm text-gray-700">
                  This is a sample comment.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
