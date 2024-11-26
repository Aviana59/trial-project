import React, { useState } from 'react';

const InviteWriter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const token = sessionStorage.getItem('token')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:3001/invite/admin/invite/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Invitation sent successfully!`);
        setEmail('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to send invitation.');
        setIsError(true);
      }
    } catch (error) {
      setMessage('An error occurred while sending the invitation.');
      setIsError(true);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Invite Writers</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter writer's email"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Send Invitation
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-sm ${isError ? 'text-red-600' : 'text-green-600'
            }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default InviteWriter;
