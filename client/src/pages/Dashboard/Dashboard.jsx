import React, { useEffect, useState } from "react";
import Avatar from "../../assets/ganesh.png";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [message, setMessage] = useState("") 
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [conversationUser, setConversationUser] = useState([]);
  const [activeUser, setActiveUser] = useState(false);
  const [messageconversationId, setMessageConversationId] = useState("")
  const [allUser, setAlluser] = useState([])

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/conversations/${user.id}`
        );
        setConversations(response.data.conversationUserData);
      } catch (error) {
        console.log("error while fetch the conversations", error);
      }
    };
    const getAllUser = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/api/getalluser")
        setAlluser(response.data.users)
        console.log(response)
      } catch (error) {
        console.log("Error while getall user on dashboard", error)
      }

    }

    getAllUser()

    fetchConversation();
  }, []);

  const fetchMessages = async (conversationId, user) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/message/${conversationId}`
      );
      setMessages(response.data.getingMessage);
      setConversationUser(user);
      setActiveUser(true);
      setMessageConversationId(conversationId)

    } catch (error) {
      console.log("error while fetch the user messages", error);
    }
  };

  const sendMessage = async()=>{
    try {
      const sendData = {
        conversationId: messageconversationId, 
        senderId: user.id,
        message: message,
        receiverId: conversationUser.id
      }
      const response = await axios.post("http://localhost:4000/api/message",sendData)
      setMessage("")
    } catch (error) {
      console.log("error while send message", error)
    }
  }

  return (
    <div className="w-screen flex ">
      <div className="w-[25%] bg-white h-screen bg-secondary">
        <div className="flex justify-center items-center my-8">
          <div className="border border-blue-800 p-2 rounded-[50%]">
            <img
              src={Avatar}
              width={75}
              height={75}
              className="rounded-[50%]"
            />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">{user.fullName}</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="ml-6">
          <div>Message</div>
          <div>
            {conversations.length > 0 ? (
              conversations.map(({ user, conversationId }, index) => (
                <div
                  key={index}
                  className="flex items-center my-8 hover:bg-slate-200 hover:rounded-md p-2 cursor-pointer"
                  onClick={() => fetchMessages(conversationId, user)}
                >
                  <div className="border border-blue-800 p-2 rounded-[50%]">
                    <img
                      src={user.img}
                      width={40}
                      height={40}
                      className="rounded-[50%]"
                    />
                  </div>
                  <div className="ml-2">
                    <h3 className="text-lg">{user.fullName}</h3>
                    <p className="text-base font-light">{user.email}</p>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-semibold pt-4">
                No Conversations yet
              </div>
            )}
          </div>
        </div>
      </div>
      {activeUser ? (
        <div className="w-[50%] h-screen flex flex-col items-center">
          <div className="flex bg-white p-4 rounded-full justify-center items-center my-8">
            <div className="border border-blue-800 p-2 rounded-[50%]">
              <img
                src={Avatar}
                width={50}
                height={50}
                className="rounded-[50%]"
              />
            </div>
            <div className="ml-8 mr-[300px]">
              <h3 className="text-lg">{conversationUser.fullName}</h3>
              <p className="text-base font-light">
                {conversationUser.fullName ? "Online" : "Ofline"}
              </p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-phone-outgoing"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2c-8.072 -.49 -14.51 -6.928 -15 -15a2 2 0 0 1 2 -2" />
                <path d="M15 5h6" />
                <path d="M18.5 7.5l2.5 -2.5l-2.5 -2.5" />
              </svg>
            </div>
          </div>
          <div className="h-[75%] border w-full overflow-y-scroll">
            <div className="h-[1000px] px-10 py-14">
              {messages.length > 0 ? (
                messages.map(({ message, user: { id } = {} }, index) => (
                  <div
                    key={index}
                    className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${
                      id === user?.id
                        ? "bg-green-600 text-white rounded-tl-xl ml-auto"
                        : "bg-blue-500 rounded-tr-xl"
                    }`}
                  >
                    {message}
                  </div>
                ))
              ) : (
                <div className="text-center text-lg font-semibold pt-4">
                  No Messages yet
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between gap-5 p-14 w-full">
            <input
              type="text"
              placeholder="Type Your Message here..."
              className="w-full p-2 rounded-lg border-orange-600"
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
            />
            <button className={`p-4 text-white font-semibold rounded-md ${message == "" ? "bg-gray-500" :"bg-green-600"}`} disabled={!message.trim()} onClick={()=>sendMessage()}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg font-semibold flex justify-center items-center m-auto">
          Select your contact persone for conversation
        </div>
      )}
      <div className="w-[25%] h-screen px-8 py-12">
        <div className="text-blue-500 text-lg">People you can message them</div>
        <div className="bg-white overflow-scroll rounded-md">
            {allUser.length > 0 ? (
              allUser.map((user,index)=> (
                <div
                  key={index}
                  className="flex items-center my-8 hover:bg-slate-200 hover:rounded-md p-2 cursor-pointer"
                  // onClick={() => fetchMessages(conversationId, user)}
                >
                  <div className="border border-blue-800 p-2 rounded-[50%]">
                    <img
                      src={user.img}
                      width={40}
                      height={40}
                      className="rounded-[50%]"
                    />
                  </div>
                  <div className="ml-2">
                    <h3 className="text-lg">{user.fullName}</h3>
                    <p className="text-base font-light">{user.email}</p>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-semibold pt-4">
                No Conversations yet
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
