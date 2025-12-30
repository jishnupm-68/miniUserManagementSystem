import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../../../store/slice/dataSlice";
import TableData from "../../shared/TableData";
import TableHead from "../../shared/TableHead";
import ConfirmModal from "../../shared/ConfirmModal";
import Pagination from "./Pagination";
const DashboardTable = ({ data, setFunction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const [_id, set_Id] = useState();
  const [status, setStatus] = useState();
  const handleCancelUpdate = () => setIsModalOpen(false);
  const handleButtonClick = (_id, status) => {
    setIsModalOpen(true);
    set_Id(_id);
    setStatus(status);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page = 1) => {
    try {
      const response = await fetch(`${apiUrl}/admin/getData?page=${page}`, {
        credentials: "include",
      });
      const result = await response.json();
      if (result.status) {
        dispatch(addData(result));
        setCurrentPage(result.currentPage);
        setTotalPages(result.totalPages);
      } else {
        setFunction(false, result.message);
      }
    } catch (error) {
      setFunction(error.status, error.message);
    }
  };
  const handlePrev = () => {
    if (currentPage > 1) fetchUsers(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) fetchUsers(currentPage + 1);
  };

  const handlePageClick = (page) => {
    fetchUsers(page);
  };

  const handleConfirmUpdate = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/editStatus`, {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id, status: status }),
      });
      const resultJson = await response.json();
      if (resultJson.status) {
        fetchUsers(currentPage);
        setFunction(resultJson.status, resultJson.message);
      } else {
        setFunction(resultJson.status, resultJson.message);
      }
    } catch (error) {
      setFunction(error.status, error.message || "Something went wrong");
    }
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchUsers(1);
  }, []);

  if (!data?.data) return;
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <TableHead />
        </thead>
        <tbody>
          {data &&
            data.data.map((item, index) => (
              <TableData
                key={item._id}
                item={item}
                index={index}
                setFunction={setFunction}
                handleButtonClick={handleButtonClick}
              />
            ))}
        </tbody>
        <tfoot>
          <TableHead />
        </tfoot>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        onPageClick={handlePageClick}
      />
      <ConfirmModal
        isOpen={isModalOpen}
        title="Update Profile"
        message="Are you sure you want to update your profile details?"
        confirmText="Yes, Update"
        cancelText="Cancel"
        onConfirm={handleConfirmUpdate}
        onCancel={handleCancelUpdate}
      />
    </div>
  );
};

export default DashboardTable;
