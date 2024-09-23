import { UserList } from "@/constants/constants";
import { StakeHolderDto, UserDto } from "@/dto/User.dto";
import { getStackHolders, getUsers } from "@/server/users";
import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

export const useUser = () => {
  const [activeTab, setActiveTab] = useState(UserList.USER);
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const [userPage, setUserPage] = useState(1);
  const [stackHolderPage, setStackHolderPage] = useState(1);
  const [usersList, setUsersList] = useState<UserDto[]>([]);
  const [stackHolderUsersList, setStackHolderUsersList] = useState<any[]>([]);
  const [userHasMore, setUserHasMore] = useState(true);
  const [stackHolderHasMore, setStackHolderHasMore] = useState(true);
  const [totalUserCount, setTotalUserCount] = useState(0); // Track total count of users
  const [totalStackHolderCount, setTotalStackHolderCount] = useState(0); // Track total count of stack holders
  const isInitialMount = useRef(true);
  const [value, setValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    if (isInitialMount.current) {
      getUserDataList();
      getStackHolderDataList();
      isInitialMount.current = false;
    }
  }, []);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery); // Set debounced value after delay
    }, 500); // 500ms delay for debounce

    return () => {
      clearTimeout(handler); // Cleanup timeout if the searchQuery changes
    };
  }, [searchQuery]);
  useEffect(() => {
    console.log(debouncedSearchQuery);
    if (debouncedSearchQuery) {
      getUserDataList();
    }
  }, [debouncedSearchQuery]);

  const getUserDataList = useCallback(async () => {
    let response = await getUsers(userPage, 5, status, debouncedSearchQuery);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) return;
      const newUsers = response.data?.dataList as UserDto[];
      if (totalUserCount === 0) {
        setTotalUserCount(response.data?.totalCount as number);
      }

      setUsersList((prevUsers) => [...prevUsers, ...newUsers]);

      if (usersList.length + newUsers.length >= response.data?.totalCount) {
        setUserHasMore(false);
      } else {
        setUserPage((prevPage) => prevPage + 1);
      }
    }
  }, [userPage, status, value, totalUserCount, usersList.length]);

  const getStackHolderDataList = useCallback(async () => {
    let response = await getStackHolders(stackHolderPage, 5, status, value);
    console.log("stakeholders = ", response);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) return;
      const newUsers = response.data?.dataList as StakeHolderDto[];
      if (totalStackHolderCount === 0) {
        setTotalStackHolderCount(response.data?.totalCount as number);
      }

      setStackHolderUsersList((prevUsers: any) => [...prevUsers, ...newUsers]);

      if (
        stackHolderUsersList.length + newUsers.length >=
        response.data?.totalCount
      ) {
        setStackHolderHasMore(false);
      } else {
        setStackHolderPage((prevPage) => prevPage + 1);
      }
    }
  }, [
    stackHolderPage,
    status,
    value,
    totalStackHolderCount,
    stackHolderUsersList.length,
  ]);

  return {
    activeTab,
    setActiveTab,
    status,
    setStatus,
    searchQuery,
    setSearchQuery,
    userPage,
    setUserPage,
    stackHolderPage,
    setStackHolderPage,
    usersList,
    setUsersList,

    userHasMore,
    setUserHasMore,
    stackHolderHasMore,
    setStackHolderHasMore,
    getUserDataList,
    value,
    setValue,
    stackHolderUsersList,
    setStackHolderUsersList,
    showModal,
    setShowModal,
    addUser,
    setAddUser,
    editUser,
    setEditUser,
    getStackHolderDataList,
  };
};
