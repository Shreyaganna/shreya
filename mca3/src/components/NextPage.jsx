import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const NextPage = () => {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateImage = async () => {
    if (!text.trim()) return; // Don't generate if the text is empty

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer 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`, // Your API Key
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer', // Expecting binary data
        }
      );

      const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageUrl(imageObjectURL);
    } catch (err) {
      console.error('Error details:', err.response || err);
      setError('An error occurred while generating the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex flex-col items-center justify-center">
      <motion.div
        className="text-center p-10 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Enter a prompt to generate an image
        </motion.h2>

        {/* Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter prompt"
          className="p-2 w-80 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Generate Button */}
        <button
          onClick={handleGenerateImage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          disabled={loading || !text.trim()}  // Disable if no prompt or loading
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>

        {/* Display generated image or error message */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Generated result"
            className="max-w-full h-auto rounded-lg shadow-md mt-4"
          />
        )}

        {error && <p className="text-red-500">{error}</p>}
      </motion.div>
    </div>
  );
};

export default NextPage;
