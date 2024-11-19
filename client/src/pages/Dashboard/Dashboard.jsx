import React, { useEffect, useState } from "react";
import Avatar from "../../assets/ganesh.png";
import Input from "../../components/Input/Input";
import axios from "axios";

const Dashboard = () => {
  const contacts = [
    {
      name: "Rahul",
      status: "Available",
      img: Avatar,
    },

    {
      name: "Rahul",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Rahul",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Rahul",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Rahul",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Rahul",
      status: "Available",
      img: Avatar,
    },
  ];

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/conversations/${user.id}`
        );
        setConversations(response.data.
          conversationUserData
          );
      } catch (error) {
        console.log("error while fetch the conversations", error);
      }
    };

    fetchConversation();
  }, []);
  console.log(conversations);

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
            {conversations.map(({user}, index) => (

              <div key={index} className="flex items-center my-8">
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
              </div>
            ))}
          </div>
        </div>
      </div>
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
            <h3 className="text-lg">{user.fullName}</h3>
            <p className="text-base font-light">Online</p>
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
            <div className="max-w-[40%] bg-green-500 text-white rounded-b-xl rounded-tr-xl p-4 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              ipsam unde, perferendis expedita tenetur veritatis est soluta
              commodi rerum adipisci labore! Commodi voluptas quas dicta neque
              cum doloribus error dolor, temporibus molestias perferendis
              facere, corporis iusto officiis eaque quod deserunt vitae.
              Mollitia tempore doloribus qui rerum maxime nihil. Officiis,
              consequatur quidem. Nostrum earum vel quasi incidunt quis,
              laudantium magnam, vitae consectetur a ab saepe eaque, obcaecati
              minus. Doloribus quia itaque atque culpa sequi minima impedit
              dolore porro quasi eligendi illo sed ullam consequatur, facere
              perspiciatis incidunt possimus sit aut deserunt et asperiores. Ex
              corrupti quia porro nesciunt amet ipsa laboriosam ipsam molestias
              ratione, veniam architecto? Nulla quam, sint recusandae ad minus
              eaque praesentium unde enim. Assumenda natus ipsum expedita
              inventore!
            </div>
            <div className="w-[300px] bg-blue-600 rounded-b-xl rounded-tl-xl ml-auto p-4 text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae,
              consectetur distinctio libero assumenda sint iste. A autem sit
              facilis voluptatum!
            </div>
            <div className="max-w-[40%] bg-green-500 text-white rounded-b-xl rounded-tr-xl p-4 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              ipsam unde, perferendis expedita tenetur veritatis est soluta
              commodi rerum adipisci labore! Commodi voluptas quas dicta neque
              cum doloribus error dolor, temporibus molestias perferendis
              facere, corporis iusto officiis eaque quod deserunt vitae.
              Mollitia tempore doloribus qui rerum maxime nihil. Officiis,
              consequatur quidem. Nostrum earum vel quasi incidunt quis,
              laudantium magnam, vitae consectetur a ab saepe eaque, obcaecati
              minus. Doloribus quia itaque atque culpa sequi minima impedit
              dolore porro quasi eligendi illo sed ullam consequatur, facere
              perspiciatis incidunt possimus sit aut deserunt et asperiores. Ex
              corrupti quia porro nesciunt amet ipsa laboriosam ipsam molestias
              ratione, veniam architecto? Nulla quam, sint recusandae ad minus
              eaque praesentium unde enim. Assumenda natus ipsum expedita
              inventore!
            </div>
            <div className="w-[300px] bg-blue-600 rounded-b-xl rounded-tl-xl ml-auto p-4 text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae,
              consectetur distinctio libero assumenda sint iste. A autem sit
              facilis voluptatum!
            </div>
            <div className="max-w-[40%] bg-green-500 text-white rounded-b-xl rounded-tr-xl p-4 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              ipsam unde, perferendis expedita tenetur veritatis est soluta
              commodi rerum adipisci labore! Commodi voluptas quas dicta neque
              cum doloribus error dolor, temporibus molestias perferendis
              facere, corporis iusto officiis eaque quod deserunt vitae.
              Mollitia tempore doloribus qui rerum maxime nihil. Officiis,
              consequatur quidem. Nostrum earum vel quasi incidunt quis,
              laudantium magnam, vitae consectetur a ab saepe eaque, obcaecati
              minus. Doloribus quia itaque atque culpa sequi minima impedit
              dolore porro quasi eligendi illo sed ullam consequatur, facere
              perspiciatis incidunt possimus sit aut deserunt et asperiores. Ex
              corrupti quia porro nesciunt amet ipsa laboriosam ipsam molestias
              ratione, veniam architecto? Nulla quam, sint recusandae ad minus
              eaque praesentium unde enim. Assumenda natus ipsum expedita
              inventore!
            </div>
            <div className="w-[300px] bg-blue-600 rounded-b-xl rounded-tl-xl ml-auto p-4 text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae,
              consectetur distinctio libero assumenda sint iste. A autem sit
              facilis voluptatum!
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-5 p-14 w-full">
          <input
            type="text"
            placeholder="Type Your Message here..."
            className="w-full p-2 rounded-lg border-orange-600"
          />
          <button className="p-4 bg-green-600 text-white font-semibold rounded-md">
            Send
          </button>
        </div>
      </div>
      <div className="w-[25%]  h-screen"></div>
    </div>
  );
};

export default Dashboard;
