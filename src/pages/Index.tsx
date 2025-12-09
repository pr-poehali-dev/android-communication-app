import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'groups' | 'profile'>('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');

  const chats: Chat[] = [
    { id: 1, name: 'Алекс Петров', avatar: '👨‍💻', lastMessage: 'Отлично! Увидимся завтра', time: '14:32', unread: 2, online: true },
    { id: 2, name: 'Мария Иванова', avatar: '👩‍🎨', lastMessage: 'Скинь файл проекта', time: '13:15', unread: 0, online: true },
    { id: 3, name: 'Команда Разработки', avatar: '💻', lastMessage: 'Созвон в 15:00', time: '12:48', unread: 5, online: false },
    { id: 4, name: 'Дмитрий Волков', avatar: '🎮', lastMessage: 'Поиграем вечером?', time: '11:20', unread: 1, online: false },
    { id: 5, name: 'Анна Смирнова', avatar: '📸', lastMessage: 'Посмотри фото с отпуска', time: 'Вчера', unread: 0, online: true },
  ];

  const messages: Message[] = [
    { id: 1, text: 'Привет! Как дела?', time: '14:28', isMine: false },
    { id: 2, text: 'Отлично! Работаю над новым проектом 🚀', time: '14:30', isMine: true, status: 'read' },
    { id: 3, text: 'Круто! Расскажешь подробнее?', time: '14:31', isMine: false },
    { id: 4, text: 'Конечно! Делаю мессенджер с крутым дизайном', time: '14:31', isMine: true, status: 'read' },
    { id: 5, text: 'Отлично! Увидимся завтра', time: '14:32', isMine: false },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  const renderChatsList = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Чаты
          </h1>
          <Button size="icon" variant="ghost" className="hover-scale">
            <Icon name="Plus" size={24} />
          </Button>
        </div>
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Поиск чатов..." 
            className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`
                flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                hover:bg-muted/50 hover-scale mb-1 animate-slide-in-up
                ${selectedChat === chat.id ? 'bg-muted' : ''}
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="text-2xl">{chat.avatar}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-accent rounded-full border-2 border-background" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate">{chat.name}</h3>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
              </div>
              
              {chat.unread > 0 && (
                <Badge className="bg-gradient-to-r from-primary to-secondary border-0 animate-scale-in">
                  {chat.unread}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  const renderChatWindow = () => {
    const currentChat = chats.find(c => c.id === selectedChat);
    if (!currentChat) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <Icon name="MessageSquare" size={64} className="mb-4 opacity-20" />
          <p className="text-lg">Выберите чат для начала общения</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full animate-fade-in">
        <div className="flex items-center gap-3 p-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={() => setSelectedChat(null)}
            className="lg:hidden hover-scale"
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarFallback className="text-xl">{currentChat.avatar}</AvatarFallback>
            </Avatar>
            {currentChat.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-background" />
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="font-semibold">{currentChat.name}</h2>
            <p className="text-xs text-muted-foreground">
              {currentChat.online ? 'в сети' : 'был(а) недавно'}
            </p>
          </div>
          
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" className="hover-scale">
              <Icon name="Video" size={20} />
            </Button>
            <Button size="icon" variant="ghost" className="hover-scale">
              <Icon name="Phone" size={20} />
            </Button>
            <Button size="icon" variant="ghost" className="hover-scale">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'} animate-slide-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`
                    max-w-[70%] rounded-2xl px-4 py-2 
                    ${msg.isMine 
                      ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-br-sm' 
                      : 'bg-muted text-foreground rounded-bl-sm'
                    }
                  `}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <div className={`flex items-center gap-1 justify-end mt-1 ${msg.isMine ? 'opacity-80' : 'opacity-60'}`}>
                    <span className="text-xs">{msg.time}</span>
                    {msg.isMine && (
                      <Icon 
                        name={msg.status === 'read' ? 'CheckCheck' : 'Check'} 
                        size={14}
                        className={msg.status === 'read' ? 'text-accent' : ''}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="hover-scale">
              <Icon name="Paperclip" size={20} />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Введите сообщение..."
                className="pr-20 bg-muted/50 border-0 focus-visible:ring-1"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button size="icon" variant="ghost" className="h-8 w-8 hover-scale">
                  <Icon name="Smile" size={18} />
                </Button>
              </div>
            </div>
            
            <Button 
              size="icon" 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover-scale"
              onClick={handleSendMessage}
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      <div className={`
        w-full lg:w-96 border-r border-border
        ${selectedChat ? 'hidden lg:block' : 'block'}
      `}>
        {renderChatsList()}
      </div>

      <div className={`
        flex-1
        ${selectedChat ? 'block' : 'hidden lg:block'}
      `}>
        {renderChatWindow()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 lg:hidden border-t border-border bg-card/95 backdrop-blur-sm">
        <div className="flex items-center justify-around p-2">
          {[
            { id: 'chats', icon: 'MessageSquare', label: 'Чаты' },
            { id: 'contacts', icon: 'Users', label: 'Контакты' },
            { id: 'groups', icon: 'Users2', label: 'Группы' },
            { id: 'profile', icon: 'User', label: 'Профиль' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex flex-col items-center gap-1 p-2 rounded-lg transition-all hover-scale
                ${activeTab === tab.id 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
                }
              `}
            >
              <Icon name={tab.icon as any} size={24} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;
