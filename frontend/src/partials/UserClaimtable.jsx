import React, { useState, useEffect, useContext } from "react";
import { UseAuthContext } from "../context/Authcontext";
function UserClaimtable() {
  const { user } = useContext(UseAuthContext);
  let email = user.user.email;
  const [claim, setclaims] = useState("");
  var data;
  const getMyClaims = async () => {
    const url = `http://localhost:8080/api/claim/getMyClaims`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "include",
      withCredentials: true,
    });
    let getData = await resp.json();
    data = getData.data.getAllclaims;
    console.log(data);
    setclaims(data);
  };
  let arrclaim = Object.values(claim);
  console.log(arrclaim);
  useEffect(() => {
    getMyClaims();
  }, []);
  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        Claims Details
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="dark:bg-gray-700">
            <tr className="text-left">
              <th className="p-3">Claim ID</th>
              <th className="p-3">Car Owner</th>
              <th className="p-3">Reg no</th>
              <th className="p-3">Vehicle Type</th>
              <th className="p-3">Vehicle Purpose</th>
              <th className="p-3">Submitted On</th>
              <th className="p-3">Status</th>
              <th className="p-3">UPDATE</th>
              <th className="p-3">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {arrclaim.map((item) => (
              <>
                <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                  <td className="p-3">
                    <p>{item._id}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.carOwner}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.registrationNo}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.vehicleType}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.vehiclePurpose}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.dateSubmitted}</p>
                  </td>
                  <td className="p-3 text-right">
                    <span className="px-3 py-1 font-semibold rounded-md dark:bg-purple-400 dark:text-gray-900">
                      <button
                        className="btn btn-primary"
                        style={{ color: "teal" }}
                      >
                        {item.status}
                      </button>
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      className="btn btn-active btn-secondary"
                      style={{ color: "blue" }}
                    >
                      UPDATE
                    </button>
                  </td>
                  <td className="p-3 text-right">
                    <span className="px-3 py-1 font-semibold rounded-md dark:bg-purple-400 dark:text-gray-900">
                      <button
                        className="btn btn-error"
                        style={{ color: "red" }}
                      >
                        DELETE
                      </button>
                    </span>
                  </td>
                </tr>
                <p>{item._id}</p>
              </>
            ))}
            {!arrclaim && (
              <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                <td className="p-3">
                  <p>97412378923</p>
                </td>
                <td className="p-3">
                  <p>Samuel Kamotho</p>
                </td>
                <td className="p-3">
                  <p>KBZ:123X</p>
                </td>
                <td className="p-3">
                  <p>BMW</p>
                </td>
                <td className="p-3">
                  <p>Personal</p>
                </td>
                <td className="p-3">
                  <p>14 Jan 2022</p>
                  <p className="dark:text-gray-400">Friday</p>
                </td>
                <td className="p-3 text-right">
                  <span className="px-3 py-1 font-semibold rounded-md dark:bg-purple-400 dark:text-gray-900">
                    <button
                      className="btn btn-primary"
                      style={{ color: "teal" }}
                    >
                      PENDING
                    </button>
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    className="btn btn-active btn-secondary"
                    style={{ color: "blue" }}
                  >
                    UPDATE
                  </button>
                </td>
                <td className="p-3 text-right">
                  <span className="px-3 py-1 font-semibold rounded-md dark:bg-purple-400 dark:text-gray-900">
                    <button className="btn btn-error" style={{ color: "red" }}>
                      DELETE
                    </button>
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserClaimtable;
