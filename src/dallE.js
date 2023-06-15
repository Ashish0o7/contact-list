import React, { useState } from 'react';
import axios from 'axios';
import Header from "./Header";
const DallEPage = () => {
    const [inputText, setInputText] = useState('');
    const [promptText, setPromptText] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');

    const handleGenerateImage = async () => {
        try {
            const response = await axios.post('https://api.dalle.com/v1/images', {
                text: inputText,
            });

            setGeneratedImage(response.data.image_url);
        } catch (error) {
            console.error('Failed to generate image:', error);
        }
    };

    const handleEditImage = async () => {
        try {
            const response = await axios.post('https://api.dalle.com/v1/edit', {
                prompt: promptText,
                image: generatedImage,
            });

            setGeneratedImage(response.data.output.url);
        } catch (error) {
            console.error('Failed to edit image:', error);
        }
    };

    return (
        <>
        <Header/>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">DALL·E Image Generation</h2>

                <div className="mb-6">
                    <label htmlFor="inputText" className="block font-semibold mb-2">
                        Input Text
                    </label>
                    <input
                        id="inputText"
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-purple-500"
                    />
                </div>

                <button
                    className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-700 transition duration-200"
                    onClick={handleGenerateImage}
                >
                    Generate Image
                </button>

                {generatedImage && (
                    <>
                        <img src={generatedImage} alt="Generated Image" className="mt-4 mb-6 rounded-lg" />

                        <div className="mb-6">
                            <label htmlFor="promptText" className="block font-semibold mb-2">
                                Additional Prompt Text
                            </label>
                            <input
                                id="promptText"
                                type="text"
                                value={promptText}
                                onChange={(e) => setPromptText(e.target.value)}
                                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <button
                            className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-700 transition duration-200"
                            onClick={handleEditImage}
                        >
                            Edit Image
                        </button>
                    </>
                )}
            </div>
        </div>
        </>
    );
};

export default DallEPage;
