const TableData = ({ item, index, handleButtonClick }) => {
  return (
    <>
      <tr key={item._id}>
        <th>{index + 1}</th>
        <td>{item.email}</td>
        <td>{item.fullName}</td>
        <td>{item.role}</td>
        <td>{item.status}</td>
        <td>
          {item.status == "active" ? (
            <button
              className="btn btn-outline btn-warning"
              onClick={() => handleButtonClick(item._id, "inactive")}
            >
              Inactive
            </button>
          ) : (
            <button
              className="btn btn-outline btn-success"
              onClick={() => handleButtonClick(item._id, "active")}
            >
              Active
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default TableData;
