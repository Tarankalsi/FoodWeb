

export default function Modal({ show, onClose, message }) {
    if (!show) return null; 
    
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
                <p className="text-gray-600">{message}</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
