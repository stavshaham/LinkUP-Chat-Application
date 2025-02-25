/**
 * ChatsPage Component
 * A real-time chat interface with advanced messaging features
 * including reactions, attachments, and user presence.
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Avatar, 
  Button, 
  Input, 
  Badge, 
  Tooltip, 
  Dropdown, 
  Modal, 
  Popover, 
  message as antMessage, 
  Radio, 
  Empty,
  MenuProps,
} from 'antd';
import { 
  SendOutlined, 
  SmileOutlined, 
  PaperClipOutlined, 
  EllipsisOutlined, 
  PhoneOutlined, 
  VideoCameraOutlined,
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  MessageOutlined,
  PushpinOutlined,
  SearchOutlined,
  StarOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  PlaySquareOutlined,
  FileOutlined,
  ExclamationCircleOutlined,
  UserAddOutlined,
  TeamOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  MessageFilled,
  MoreOutlined
} from '@ant-design/icons';
import './ChatsPage.css';

// Interface definitions for chat functionality
/** Defines the structure for message reactions */
interface Reaction {
  emoji: string;  // The emoji used for the reaction
  count: number;  // Number of users who reacted
  users: string[];  // List of users who used this reaction
}

/** Defines the structure for file attachments */
interface Attachment {
  id: string;  // Unique identifier for the attachment
  fileName: string;  // Original file name
  fileType: string;  // MIME type or file extension
  fileSize: number;  // Size in bytes
  url: string;  // URL to access the file
  timestamp: Date;  // When the file was attached
  messageId: string;  // Associated message ID
}

/** Defines the structure for chat messages */
interface Message {
  id: string;  // Unique message identifier
  text: string;  // Message content
  sender: string;  // Name of the sender
  timestamp: Date;  // When the message was sent
  isOwn: boolean;  // Whether the current user sent this message
  status: 'sent' | 'delivered' | 'read';  // Message delivery status
  edited: boolean;  // Whether the message has been edited
  replyTo?: string;  // ID of the message being replied to
  reactions: Reaction[];  // List of reactions to this message
  isPinned?: boolean;  // Whether the message is pinned
  isStarred?: boolean;  // Whether the message is starred
  isFlagged?: boolean;  // Whether the message is flagged
  attachments?: Attachment[];  // List of attached files
}

/** Defines the structure for user data */
interface User {
  id: string;  // Unique user identifier
  name: string;  // Display name
  avatar: string;  // URL to avatar image
  isOnline: boolean;  // Current online status
}

// Available emoji reactions for messages
const REACTION_EMOJIS = ['❤️', '👍', '😊', '😂', '😮', '😢'];

/**
 * Main chat component that handles all messaging functionality
 */
const ChatsPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | undefined>(undefined);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showStarred, setShowStarred] = useState(false);
  const [showPinned, setShowPinned] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [attachmentFilter, setAttachmentFilter] = useState<string>('all');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  /**
   * Scrolls the chat window to the bottom smoothly
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Initializes mock data for active users and messages
   * TODO: Replace with actual API calls in production
   */
  useEffect(() => {
    setActiveUsers([
      { id: '1', name: 'John Doe', avatar: 'https://xsgames.co/randomusers/avatar.php?g=male', isOnline: true },
      { id: '2', name: 'Jane Smith', avatar: 'https://xsgames.co/randomusers/avatar.php?g=female', isOnline: true },
      { id: '3', name: 'Mike Johnson', avatar: 'https://xsgames.co/randomusers/avatar.php?g=male', isOnline: false },
    ]);

    setMessages([
      { 
        id: '1', 
        text: 'Hey there!', 
        sender: 'John', 
        timestamp: new Date(), 
        isOwn: false,
        status: 'read',
        edited: false,
        reactions: [{ emoji: '👍', count: 1, users: ['You'] }],
        attachments: [
          {
            id: '1',
            fileName: 'document.pdf',
            fileType: 'pdf',
            fileSize: 1024576, // 1MB
            url: '#',
            timestamp: new Date(),
            messageId: '1'
          }
        ]
      },
      { 
        id: '2', 
        text: 'Hi! Here are the images you requested', 
        sender: 'You', 
        timestamp: new Date(), 
        isOwn: true,
        status: 'read',
        edited: false,
        reactions: [],
        attachments: [
          {
            id: '2',
            fileName: 'image1.jpg',
            fileType: 'image',
            fileSize: 512000, // 500KB
            url: '#',
            timestamp: new Date(),
            messageId: '2'
          },
          {
            id: '3',
            fileName: 'image2.jpg',
            fileType: 'image',
            fileSize: 768000, // 750KB
            url: '#',
            timestamp: new Date(),
            messageId: '2'
          }
        ]
      },
    ]);
  }, []);

  /**
   * Auto-scrolls to bottom whenever messages are updated
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Handles sending a new message
   * - Creates a new message object
   * - Adds it to the message list
   * - Simulates message delivery and read status
   */
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: 'You',
        timestamp: new Date(),
        isOwn: true,
        status: 'sent',
        edited: false,
        replyTo: replyingTo,
        reactions: []
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      setReplyingTo(undefined);
      
      // Simulate message being delivered and read
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'delivered' } 
              : msg
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'read' } 
              : msg
          )
        );
      }, 2000);
    }
  };

  /**
   * Updates input field as user types
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  /**
   * Handles keyboard events in the input field
   * Sends message on Enter key (without shift)
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Updates the text content of an existing message
   * @param messageId - ID of the message to edit
   * @param newText - New message content
   */
  const handleEditMessage = (messageId: string, newText: string) => {
    if (newText.trim()) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, text: newText, edited: true }
            : msg
        )
      );
      setEditingMessage(null);
    }
  };

  /**
   * Removes a message from the chat
   * @param messageId - ID of the message to delete
   */
  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  /**
   * Toggles an emoji reaction on a message
   * - Adds reaction if not present
   * - Removes reaction if already present
   * @param messageId - ID of the message to react to
   * @param emoji - The emoji to toggle
   */
  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find(r => r.emoji === emoji);
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions.map(r =>
                r.emoji === emoji
                  ? { ...r, count: r.count - 1, users: r.users.filter(u => u !== 'You') }
                  : r
              ).filter(r => r.count > 0)
            };
          } else {
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, count: 1, users: ['You'] }]
            };
          }
        }
        return msg;
      })
    );
  };

  /**
   * Finds a message by its ID for reply context
   * @param replyId - ID of the message being replied to
   * @returns The message being replied to, or undefined
   */
  const getReplyMessage = (replyId: string) => {
    return messages.find(msg => msg.id === replyId);
  };

  /**
   * Toggles pin status of a message
   * @param messageId - ID of the message to pin/unpin
   */
  const handlePinMessage = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, isPinned: !msg.isPinned }
          : msg
      )
    );
    antMessage.success(messages.find(m => m.id === messageId)?.isPinned 
      ? 'Message unpinned' 
      : 'Message pinned');
  };

  /**
   * Toggles star status of a message
   * @param messageId - ID of the message to star/unstar
   */
  const handleStarMessage = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, isStarred: !msg.isStarred }
          : msg
      )
    );
  };

  /**
   * Toggles flag status of a message for moderation
   * @param messageId - ID of the message to flag/unflag
   */
  const handleFlagMessage = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, isFlagged: !msg.isFlagged }
          : msg
      )
    );
    antMessage.info('Message has been flagged for review');
  };

  /**
   * Copies message text to clipboard
   * @param text - Text content to copy
   */
  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    antMessage.success('Message copied to clipboard');
  };

  /**
   * Initiates message forwarding process
   * @param message - Message to forward
   */
  const handleForwardMessage = (message: Message) => {
    setSelectedMessage(message);
    // Here you would typically open a modal to select users to forward to
    antMessage.info('Forward message feature coming soon');
  };

  /**
   * Shows confirmation dialog before deleting a message
   * @param messageId - ID of the message to delete
   */
  const showDeleteConfirm = (messageId: string) => {
    Modal.confirm({
      title: 'Delete Message',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this message? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        handleDeleteMessage(messageId);
        antMessage.success('Message deleted');
      },
    });
  };

  /**
   * Generates context menu items for a message
   * @param message - Message to generate menu items for
   * @returns Array of menu items based on message ownership
   */
  const messageMenuItems = (message: Message): MenuProps['items'] => [
    {
      key: 'star',
      label: message.isStarred ? 'Unstar' : 'Star',
      icon: <StarOutlined />,
      onClick: () => handleStarMessage(message.id)
    },
    {
      key: 'pin',
      label: message.isPinned ? 'Unpin' : 'Pin',
      icon: <PushpinOutlined />,
      onClick: () => handlePinMessage(message.id)
    },
    {
      key: 'reply',
      label: 'Reply',
      icon: <MessageOutlined />,
      onClick: () => setReplyingTo(message.id)
    },
    ...(message.isOwn ? [
      {
        key: 'edit',
        label: 'Edit',
        icon: <EditOutlined />,
        onClick: () => setEditingMessage(message.id)
      },
      {
        key: 'delete',
        label: 'Delete',
        icon: <DeleteOutlined />,
        danger: true,
        onClick: () => handleDeleteMessage(message.id)
      }
    ] : [])
  ];

  /**
   * Generates menu items for the main chat options
   * Includes search, starred messages, and pinned messages toggles
   */
  const moreMenuItems: MenuProps['items'] = [
    {
      key: 'search',
      label: 'Search Messages',
      icon: <SearchOutlined />,
      onClick: () => {
        setShowSearch(!showSearch);
        setShowStarred(false);
        setShowPinned(false);
      }
    },
    {
      key: 'starred',
      label: 'Starred Messages',
      icon: <StarOutlined />,
      onClick: () => {
        setShowStarred(!showStarred);
        setShowSearch(false);
        setShowPinned(false);
      }
    },
    {
      key: 'pinned',
      label: 'Pinned Messages',
      icon: <PushpinOutlined />,
      onClick: () => {
        setShowPinned(!showPinned);
        setShowSearch(false);
        setShowStarred(false);
      }
    },
    {
      type: 'divider'
    },
    {
      key: 'clearChat',
      label: 'Clear Chat',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => {
        Modal.confirm({
          title: 'Clear Chat History',
          icon: <ExclamationCircleOutlined />,
          content: 'Are you sure you want to clear all messages? This action cannot be undone.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: () => setMessages([])
        });
      }
    }
  ];

  const filteredMessages = messages.filter(msg => {
    if (showStarred) return msg.isStarred;
    if (showPinned) return msg.isPinned;
    if (searchQuery) return msg.text.toLowerCase().includes(searchQuery.toLowerCase());
    return true;
  });

  /**
   * Formats file size in bytes to human-readable format
   * @param bytes - File size in bytes
   * @returns Formatted file size string
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  /**
   * Returns the file icon based on file type
   * @param fileType - MIME type or file extension
   * @returns File icon component
   */
  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FilePdfOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />;
      case 'image':
        return <FileImageOutlined style={{ fontSize: '24px', color: '#52c41a' }} />;
      case 'video':
        return <PlaySquareOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
      default:
        return <FileOutlined style={{ fontSize: '24px', color: '#666' }} />;
    }
  };

  /**
   * Retrieves all attachments from messages
   * @returns Array of attachments
   */
  const getAllAttachments = (): Attachment[] => {
    return messages.reduce((acc: Attachment[], message) => {
      if (message.attachments) {
        return [...acc, ...message.attachments];
      }
      return acc;
    }, []);
  };

  const filteredAttachments = getAllAttachments().filter(attachment => {
    if (attachmentFilter === 'all') return true;
    return attachment.fileType === attachmentFilter;
  });

  const menuItems: MenuProps['items'] = [
    {
      key: 'addFriends',
      icon: <UserAddOutlined />,
      label: <span className="menu-item">Add Friends</span>,
      onClick: () => console.log('Add Friends')
    },
    {
      key: 'friendsList',
      icon: <TeamOutlined />,
      label: <span className="menu-item">Friends List</span>,
      onClick: () => console.log('Friends List')
    },
    {
      key: 'userSettings',
      icon: <SettingOutlined />,
      label: <span className="menu-item">User Settings</span>,
      onClick: () => console.log('User Settings')
    },
    {
      key: 'createGroup',
      icon: <UsergroupAddOutlined />,
      label: <span className="menu-item">Create Group</span>,
      onClick: () => console.log('Create Group')
    },
    {
      key: 'searchChat',
      icon: <MessageFilled />,
      label: <span className="menu-item">Search Chat</span>,
      onClick: () => console.log('Search Chat')
    }
  ];

  return (
    <>
      <div className="chat-container">
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <h2>LinkUP Chat</h2>
          </div>
          <div className="sidebar-subheader">
            <h3>Active Chats</h3>
            <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
              <Button type="text" icon={<MoreOutlined />} />
            </Dropdown>
          </div>
          <div className="active-users">
            {activeUsers.map((user) => (
              <div key={user.id} className="user-item">
                <Badge dot={user.isOnline} color="green" offset={[-5, 5]}>
                  <Avatar src={user.avatar} size="large" />
                </Badge>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-status">{user.isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-main">
          <div className="chat-header">
            <div className="chat-header-user">
              <Avatar src={activeUsers[0]?.avatar} />
              <div className="chat-header-info">
                <h3>{activeUsers[0]?.name}</h3>
                <span>{activeUsers[0]?.isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
            <div className="chat-header-actions">
              {showSearch && (
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: 200 }}
                  prefix={<SearchOutlined />}
                  allowClear />
              )}
              <Button
                icon={<PaperClipOutlined />}
                onClick={() => setShowAttachments(true)}
              >
                <Badge count={getAllAttachments().length} />
              </Button>
              <Button icon={<PhoneOutlined />} />
              <Button icon={<VideoCameraOutlined />} />
              <Dropdown menu={{ items: moreMenuItems }} placement="bottomRight">
                <Button icon={<EllipsisOutlined />} />
              </Dropdown>
            </div>
          </div>

          <div className="chat-messages" ref={messagesEndRef}>
            {showPinned && filteredMessages.length === 0 && (
              <div className="empty-state">No pinned messages</div>
            )}
            {showStarred && filteredMessages.length === 0 && (
              <div className="empty-state">No starred messages</div>
            )}
            {searchQuery && filteredMessages.length === 0 && (
              <div className="empty-state">No messages found</div>
            )}
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.isOwn ? 'message-own' : ''} ${message.isPinned ? 'message-pinned' : ''}`}
              >
                {!message.isOwn && (
                  <Avatar src={activeUsers.find(u => u.name === message.sender)?.avatar} />
                )}
                <div className="message-content">
                  {message.replyTo && (
                    <div className="message-reply">
                      <div className="reply-content">
                        <small>{getReplyMessage(message.replyTo)?.sender}</small>
                        <p>{getReplyMessage(message.replyTo)?.text}</p>
                      </div>
                    </div>
                  )}
                  <Dropdown
                    menu={{ items: messageMenuItems(message) }}
                    trigger={['contextMenu']}
                  >
                    <div className="message-bubble">
                      {editingMessage === message.id ? (
                        <Input
                          defaultValue={message.text}
                          onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            const target = e.target as HTMLInputElement;
                            handleEditMessage(message.id, target.value);
                          }}
                          onBlur={() => setEditingMessage(null)}
                          autoFocus
                        />
                      ) : (
                        <>
                          {message.text}
                          {message.edited && (
                            <small className="edited-tag"> (edited)</small>
                          )}
                        </>
                      )}
                    </div>
                  </Dropdown>
                  <div className="message-info">
                    <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                    {message.isOwn && (
                      <span className="message-status">
                        {message.status === 'sent' && <CheckOutlined />}
                        {message.status === 'delivered' && (
                          <>
                            <CheckOutlined />
                            <CheckOutlined style={{ marginLeft: '-4px' }} />
                          </>
                        )}
                        {message.status === 'read' && (
                          <>
                            <CheckOutlined style={{ color: '#1677ff' }} />
                            <CheckOutlined style={{ marginLeft: '-4px', color: '#1677ff' }} />
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  {message.reactions.length > 0 && (
                    <div className="message-reactions">
                      {message.reactions.map((reaction, index) => (
                        <Tooltip
                          key={index}
                          title={`${reaction.users.join(', ')}`}
                        >
                          <span className="reaction">
                            {reaction.emoji} {reaction.count}
                          </span>
                        </Tooltip>
                      ))}
                    </div>
                  )}
                  {message.attachments && (
                    <div className="message-attachments">
                      {message.attachments.map(attachment => (
                        <div key={attachment.id} className="attachment-item">
                          <div className="attachment-icon">
                            {getFileIcon(attachment.fileType)}
                          </div>
                          <div className="attachment-info">
                            <div className="attachment-name">{attachment.fileName}</div>
                            <div className="attachment-meta">
                              {formatFileSize(attachment.fileSize)} • {new Date(attachment.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="attachment-actions">
                            <Tooltip title="Download">
                              <Button
                                type="text"
                                icon={<DownloadOutlined />}
                                onClick={() => window.open(attachment.url, '_blank')} />
                            </Tooltip>
                            <Tooltip title="Share">
                              <Button
                                type="text"
                                icon={<ShareAltOutlined />} />
                            </Tooltip>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="message-actions">
                  <Dropdown menu={{ items: messageMenuItems(message) }} trigger={['click']}>
                    <EllipsisOutlined className="message-more" />
                  </Dropdown>
                  {message.isPinned && (
                    <Tooltip title="Pinned">
                      <PushpinOutlined className="message-flag" />
                    </Tooltip>
                  )}
                  {message.isStarred && (
                    <Tooltip title="Starred">
                      <StarOutlined className="message-flag" style={{ color: '#faad14' }} />
                    </Tooltip>
                  )}
                </div>
                <Popover
                  content={<div className="reaction-picker">
                    {REACTION_EMOJIS.map(emoji => (
                      <span
                        key={emoji}
                        onClick={() => handleReaction(message.id, emoji)}
                        className="reaction-emoji"
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>}
                  trigger="hover"
                  placement={message.isOwn ? "leftTop" : "rightTop"}
                >
                  <Button
                    type="text"
                    icon={<SmileOutlined />}
                    className="reaction-button" />
                </Popover>
              </div>
            ))}
          </div>

          {replyingTo && (
            <div className="reply-bar">
              <MessageOutlined />
              <span>Replying to: {getReplyMessage(replyingTo)?.text}</span>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => setReplyingTo(undefined)} />
            </div>
          )}

          <div className="chat-input">
            <Button icon={<PaperClipOutlined />} type="text" className="input-action" />
            <Button icon={<SmileOutlined />} type="text" className="input-action" />
            <Input
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              suffix={<SendOutlined onClick={handleSendMessage} className="send-button" />} />
          </div>
        </div>
      </div>

      <Modal
        title="Attached Files"
        open={showAttachments}
        onCancel={() => setShowAttachments(false)}
        footer={null}
        width={600}
      >
        <div className="attachments-header">
          <Radio.Group
            value={attachmentFilter}
            onChange={(e) => setAttachmentFilter(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="image">Images</Radio.Button>
            <Radio.Button value="pdf">Documents</Radio.Button>
            <Radio.Button value="video">Videos</Radio.Button>
          </Radio.Group>
        </div>
        <div className="attachments-list">
          {filteredAttachments.length === 0 ? (
            <Empty description="No attachments found" />
          ) : (
            filteredAttachments.map(attachment => (
              <div key={attachment.id} className="attachment-item">
                <div className="attachment-icon">
                  {getFileIcon(attachment.fileType)}
                </div>
                <div className="attachment-info">
                  <div className="attachment-name">{attachment.fileName}</div>
                  <div className="attachment-meta">
                    {formatFileSize(attachment.fileSize)} • {new Date(attachment.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <div className="attachment-actions">
                  <Tooltip title="Download">
                    <Button
                      type="text"
                      icon={<DownloadOutlined />}
                      onClick={() => window.open(attachment.url, '_blank')} />
                  </Tooltip>
                  <Tooltip title="Share">
                    <Button
                      type="text"
                      icon={<ShareAltOutlined />} />
                  </Tooltip>
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </>
  );
};

export default ChatsPage;