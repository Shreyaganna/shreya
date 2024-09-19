import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './index.css';

const Section = ({ title, content }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures animation only happens once
    threshold: 0.2, // Triggers when 20% of the section is in view
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="p-8 my-20 bg-white rounded-lg shadow-lg text-center"
    >
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-lg">{content}</p>
    </motion.div>
  );
};

const App = () => {
  return (
    <div className="bg-gradient-to-r from-gradient-start to-gradient-end min-h-screen">
      {/* Hero Section */}
      <motion.div
        className="text-center p-10 h-screen flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl font-bold text-white mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Get Started
        </motion.h1>
        <motion.button
          className="text-white bg-blue-500 px-6 py-3 rounded-full hover:bg-blue-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/next-page'}
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Scrollable Sections */}
      <Section
        title="About Our Platform"
        content="We bring you the best futuristic designs to make your experience extraordinary."
      />
      <Section
        title="Our Vision"
        content="We aim to create a seamless and immersive web experience."
      />
      <Section
        title="Contact Us"
        content="Feel free to reach out for more information!"
      />
    </div>
  );
};

export default App;
