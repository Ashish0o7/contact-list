import React, { useEffect, useState } from "react";
import Header from "./Header";

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [editedContact, setEditedContact] = useState(null);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setIsLoggedIn(true);
      fetchContacts(userEmail);
    }
  }, []);

  const fetchContacts = async (userEmail) => {
    try {
     
      const response = await fetch(
        `https://backend-contact-list.onrender.com/contacts?email=${userEmail}`
      );
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await fetch(`https://backend-contact-list.onrender.com/contacts/${id}`, {
        method: "DELETE",
      });

     
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== id)
      );
      //here i'm changing contacts without rerendering the list

    } catch (error) {
      console.log(error);
    }
  };

  const handleEditContact = (contact) => {
    setEditedContact(contact);
    setNewContactName(contact.name);
    setNewContactPhone(contact.phone);
    setNewEmail(contact.mail2);
  };

  const handleUpdateContact = async () => {
    try {
      const { _id } = editedContact;

      await fetch(`http://localhost:3001/contacts/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newContactName,
          phone: newContactPhone,
          mail2: newEmail,
        }),
      });

      // Similarly for update also without re-rendering the entire list
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === _id
            ? {
                ...contact,
                name: newContactName,
                phone: newContactPhone,
                mail2: newEmail,
              }
            : contact
        )
      );

     
      setEditedContact(null);
      setNewContactName("");
      setNewContactPhone("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateContact = async () => {
    try {
      const userEmail = localStorage.getItem("email");
      const response = await fetch(
        `https://backend-contact-list.onrender.com/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newContactName,
            phone: newContactPhone,
            email: userEmail,
            mail2: newEmail,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContacts((prevContacts) => [...prevContacts, data]);
        setNewContactName("");
        setNewContactPhone("");
        setNewEmail("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen min-w-screen container mx-auto px-4 py-8"
           style={{
             background: "linear-gradient(-45deg, #6C63FF, #D0C3FF)",
           }}>
        {isLoggedIn ? (
            <>
              <div className="w-full md:w-1/2 mx-auto mb-8">
                <div className="max-w-screen bg-white text-black rounded-lg p-4 shadow-md -mx-12 my-8 flex-auto">
                  <h2 className="text-2xl font-bold mb-4">Create Contact</h2>
                  <div className="flex flex-col md:flex-row md:space-x-4 mx:space-y-2">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                        className="border border-purple-300 text-black rounded px-4 py-2 focus:outline-none focus:border-purple-500"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={newContactPhone}
                        onChange={(e) => setNewContactPhone(e.target.value)}
                        className="border border-purple-300 text-black rounded px-4 py-2 focus:outline-none focus:border-purple-500"
                    />
                    <input
                        type="mail"
                        placeholder="Contact mail"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="border border-purple-300 text-black rounded px-4 py-2 focus:outline-none focus:border-purple-500"
                    />
                    <button
                        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-800 transition duration-200 mt-4 md:mt-0"
                        onClick={handleCreateContact}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold py-8">Contacts Saved:</h2>
              {contacts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {contacts.map((contact) => (
                        <div key={contact._id} className="bg-white text-purple-800 rounded-lg p-4 shadow-md">
                          {editedContact && editedContact._id === contact._id ? (
                              <div className="flex items-center">
                                <input
                                    type="text"
                                    value={newContactName}
                                    onChange={(e) => setNewContactName(e.target.value)}
                                    className="border border-purple-300 rounded px-4 py-2 focus:outline-none focus:border-purple-500 mr-2"
                                />
                                <input
                                    type="tel"
                                    value={newContactPhone}
                                    onChange={(e) => setNewContactPhone(e.target.value)}
                                    className="border border-purple-300 rounded px-4 py-2 focus:outline-none focus:border-purple-500 mr-2"
                                />
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="border border-purple-300 rounded px-4 py-2 focus:outline-none focus:border-purple-500 mr-2"
                                />
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
                                    onClick={handleUpdateContact}
                                >
                                  Update
                                </button>
                              </div>
                          ) : (
                              <>
                                <div>
                                  <p className="text-2xl font-bold mb-2">{contact.name}</p>
                                  <p className="text-gray-700 mb-1">Phone No.: {contact.phone}</p>
                                  <p className="text-gray-700 mb-4">Email: {contact.mail2}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                      className="bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                      onClick={() => handleEditContact(contact)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                      className="bg-black hover:bg-purple-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                                      onClick={() => handleDeleteContact(contact._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                          )}
                        </div>
                    ))}
                  </div>
              ) : (
                  <>
                    <div className="flex items-center">
                      <h4 className="text-xl font-bold">Loading........</h4>
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                    </div>
                    <p className="mr-2 mb-4 font-bold">
                      Please wait for a while, probably the API calls to the server are taking time.
                      <br />
                      <br />
                      Else, you have not added any contacts.
                    </p>
                  </>
              )}
            </>
        ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <p className="text-xl font-bold">Please login to view and add contacts.</p>
              </div>
            </div>
        )}
      </div>



    </>
  );
};

export default Landing;
