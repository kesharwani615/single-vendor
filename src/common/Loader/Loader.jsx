import React from "react";

export const Loader = () => {
  return (
    <>
      <>
        <tr>
          <td colSpan={10}>
            <div
              className="spinner-border text-primary"
              role="status"
              aria-label="Loading"
            ></div>
          </td>
        </tr>
      </>
    </>
  );
};
