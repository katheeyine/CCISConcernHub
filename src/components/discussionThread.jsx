import React, { useState, useEffect, useRef } from "react";

const DiscussionThread = ({ initialDiscussion, status, concernCreatedDate }) => {
    const [discussion, setDiscussion] = useState(initialDiscussion);
    const [newMessage, setNewMessage] = useState("");

    const textareaRef = useRef(null);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                sender: "Student",
                message: newMessage,
                timestamp: new Date().toLocaleString(),
            };
            setDiscussion([...discussion, newMsg]);
            setNewMessage("");
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto"; // Reset height after sending
            }
        }
    };

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; // Reset height to recalculate
            textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);

        const datePart = d.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

        const timePart = d.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });

        return `${datePart} at ${timePart}`;
    };

    return (
        <div className="p-4 rounded-md mb-8 mx-14">
            <div className="border mb-10 "></div>
            <h3 className="text-xl font-semibold mt-2 mb-10">Discussion Thread</h3>

            <div className="max-h-80 overflow-y-auto mb-4">
                <div className="text-center text-xs text-gray-500 mt-4 mb-5">
                    <p>{formatDate(concernCreatedDate)}</p>
                    <p>30 days of inactivity will automatically close the concern.</p>
                </div>

                {status === "In Progress" && (
                    <div className="text-center text-xs text-gray-500 mb-5">
                        <p>{formatDate(new Date())}</p>
                        <p>This concern is now marked as In Progress.</p>
                    </div>
                )}
                {status === "On Hold" && (
                    <div className="text-center text-xs text-gray-500 mb-5">
                        <p>{formatDate(new Date())}</p>
                        <p>This concern is now marked as On Hold.</p>
                    </div>
                )}
                {status === "Closed" && (
                    <div className="text-center text-xs text-gray-500 mb-5">
                        <p>This concern is now marked as Closed.</p>
                    </div>
                )}

                {discussion.map((msg, index) => (
                    <div key={index} className="relative">
                        <div className="pr-3 pl-3 text-sm pt-3">
                            <p className="ml-1 text-gray-600 text-xs text-left pb-2">
                                <strong>{msg.sender}</strong>
                            </p>
                            <p className="ml-1 text-sm break-all overflow-hidden pb-3">
                                {msg.message}
                            </p>
                            <p className="absolute right-0 top-0 text-xs text-gray-500 text-right mr-4 pt-3">
                                {formatDate(msg.timestamp)}
                            </p>
                            <div className="border-t border-gray-300 border-t-[0.5px]"></div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Input for new message */}
            <div className="bg-gray-100 ml-3 flex flex-col border border-gray-300 rounded-md mt-8 overflow-hidden">
                <textarea
                    ref={textareaRef}
                    value={newMessage}
                    onChange={(e) => {
                        setNewMessage(e.target.value);
                        adjustHeight();
                    }}
                    placeholder="Send a reply..."
                    className="bg-gray-100 px-4 py-2 outline-none resize-none min-h-[40px] max-h-32 overflow-y-auto text-sm"
                    rows={1}
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white text-sm px-4 py-1 m-2 rounded-xl hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiscussionThread;
