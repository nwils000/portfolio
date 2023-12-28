import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const form = useRef(null);

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          'service_3t589y2',
          'template_u5t6zq1',
          form.current,
          'aEYQQP-65mEPEsaXX'
        )
        .then(
          (result) => {
            console.log(result.text);
            setStatusMessage(
              'Your message has been sent! Thank you for reaching out.'
            );
          },
          (error) => {
            console.log(error.text);
            setStatusMessage(
              'There was an error sending your message. Please try again.'
            );
          }
        );
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center min-h-screen gap-10 p-4 mx-auto text-left text-white font-roboto"
    >
      <h1 className="mt-12 mb-5 text-4xl font-semibold text-white sm:text-5xl">
        Contact
      </h1>
      <div className="px-20 py-10 m-4 mx-auto text-center transition-transform duration-500 ease-in-out transform rounded-lg shadow-2xl bg-gradient-to-br sm:max-w-xl">
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto space-y-6 text-left sm:max-w-lg"
        >
          <div>
            <label
              htmlFor="user_name"
              className="block mb-2 text-lg font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              placeholder="Your name"
              value={formData.user_name}
              onChange={handleChange}
              required
              className="w-full p-2 text-white bg-transparent border border-white rounded form-input"
            />
          </div>
          <div>
            <label
              htmlFor="user_email"
              className="block mb-2 text-lg font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              placeholder="Your email"
              value={formData.user_email}
              onChange={handleChange}
              required
              className="w-full p-2 text-white bg-transparent border border-white rounded form-input"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-lg font-medium text-white"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-2 text-white bg-transparent border border-white rounded form-textarea"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white transition-colors duration-200 transform bg-blue-600 rounded hover:bg-blue-700 hover:scale-105"
          >
            Send Message
          </button>
          {statusMessage && (
            <p className="mt-4 text-green-400">{statusMessage}</p>
          )}
        </form>
        <p className="mt-8 text-center text-white sm:text-lg">
          You can also reach me at:{' '}
          <a
            href="mailto:your-email@example.com"
            className="text-blue-400 hover:text-blue-600"
          >
            nwils000@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
