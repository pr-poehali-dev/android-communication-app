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
  text?: string;
  time: string;
  isMine: boolean;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'voice' | 'image' | 'file';
  voiceDuration?: string;
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  fileIcon?: string;
}

interface Story {
  id: number;
  name: string;
  avatar: string;
  hasStory: boolean;
  isViewed: boolean;
}

interface Group {
  id: number;
  name: string;
  avatar: string;
  description: string;
  members: number;
  lastMessage: string;
  time: string;
  unread: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'groups' | 'profile'>('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [showStories, setShowStories] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const chats: Chat[] = [
    { id: 1, name: 'Алекс Петров', avatar: '👨‍💻', lastMessage: 'Отлично! Увидимся завтра', time: '14:32', unread: 2, online: true },
    { id: 2, name: 'Мария Иванова', avatar: '👩‍🎨', lastMessage: 'Скинь файл проекта', time: '13:15', unread: 0, online: true },
    { id: 3, name: 'Команда Разработки', avatar: '💻', lastMessage: 'Созвон в 15:00', time: '12:48', unread: 5, online: false },
    { id: 4, name: 'Дмитрий Волков', avatar: '🎮', lastMessage: 'Поиграем вечером?', time: '11:20', unread: 1, online: false },
    { id: 5, name: 'Анна Смирнова', avatar: '📸', lastMessage: 'Посмотри фото с отпуска', time: 'Вчера', unread: 0, online: true },
  ];

  const stories: Story[] = [
    { id: 0, name: 'Ваш статус', avatar: '📸', hasStory: false, isViewed: false },
    { id: 1, name: 'Алекс', avatar: '👨‍💻', hasStory: true, isViewed: false },
    { id: 2, name: 'Мария', avatar: '👩‍🎨', hasStory: true, isViewed: false },
    { id: 3, name: 'Дмитрий', avatar: '🎮', hasStory: true, isViewed: true },
    { id: 4, name: 'Анна', avatar: '📸', hasStory: true, isViewed: true },
    { id: 5, name: 'Команда', avatar: '💻', hasStory: true, isViewed: false },
  ];

  const groups: Group[] = [
    { id: 1, name: 'Команда Разработки', avatar: '💻', description: 'Обсуждение проектов', members: 12, lastMessage: 'Созвон в 15:00', time: '12:48', unread: 5 },
    { id: 2, name: 'Друзья', avatar: '🎉', description: 'Чат с друзьями', members: 8, lastMessage: 'Кто на выходных?', time: '11:30', unread: 2 },
    { id: 3, name: 'Design Community', avatar: '🎨', description: 'Дизайнеры и креатив', members: 45, lastMessage: 'Посмотрите мой мокап', time: 'Вчера', unread: 0 },
    { id: 4, name: 'Семья', avatar: '❤️', description: 'Семейный чат', members: 5, lastMessage: 'Ужин готов!', time: 'Вчера', unread: 0 },
    { id: 5, name: 'Геймеры', avatar: '🎮', description: 'Игровые сессии', members: 15, lastMessage: 'Кто в Dota?', time: '2 дня назад', unread: 0 },
  ];

  const messages: Message[] = [
    { id: 1, text: 'Привет! Как дела?', time: '14:28', isMine: false, type: 'text' },
    { id: 2, text: 'Отлично! Работаю над новым проектом 🚀', time: '14:30', isMine: true, status: 'read', type: 'text' },
    { id: 3, time: '14:30', isMine: false, type: 'voice', voiceDuration: '0:15' },
    { id: 4, time: '14:31', isMine: true, status: 'read', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800' },
    { id: 5, text: 'Круто! Расскажешь подробнее?', time: '14:31', isMine: false, type: 'text' },
    { id: 6, time: '14:31', isMine: true, status: 'read', type: 'voice', voiceDuration: '0:23' },
    { id: 7, time: '14:32', isMine: false, type: 'file', fileName: 'presentation.pdf', fileSize: '2.4 MB', fileIcon: 'FileText' },
    { id: 8, text: 'Конечно! Делаю мессенджер с крутым дизайном', time: '14:32', isMine: true, status: 'read', type: 'text' },
    { id: 9, text: 'Отлично! Увидимся завтра', time: '14:32', isMine: false, type: 'text' },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    return interval;
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderGroupsList = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Группы
          </h1>
          <Button size="icon" variant="ghost" className="hover-scale">
            <Icon name="Plus" size={24} />
          </Button>
        </div>
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Поиск групп..." 
            className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {groups.map((group, index) => (
            <div
              key={group.id}
              className="
                p-4 rounded-xl cursor-pointer transition-all duration-200
                hover:bg-muted/50 hover-scale mb-2 animate-slide-in-up
                border border-border/50
              "
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-14 w-14 border-2 border-primary/20">
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                    {group.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold truncate">{group.name}</h3>
                    <span className="text-xs text-muted-foreground ml-2">{group.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{group.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Users" size={14} />
                      <span>{group.members} участников</span>
                    </div>
                    {group.unread > 0 && (
                      <Badge className="bg-gradient-to-r from-primary to-secondary border-0 animate-scale-in">
                        {group.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-1">{group.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-4 mt-4">
            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover-scale"
              size="lg"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Создать новую группу
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );

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
      
      {showStories && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground">СТАТУСЫ</h2>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6 hover-scale"
              onClick={() => setShowStories(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          <ScrollArea className="w-full">
            <div className="flex gap-3 pb-2">
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className="flex flex-col items-center gap-1 cursor-pointer hover-scale animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`relative ${
                    story.id === 0 
                      ? 'ring-2 ring-dashed ring-muted-foreground' 
                      : story.hasStory && !story.isViewed
                        ? 'ring-2 ring-primary'
                        : story.hasStory && story.isViewed
                          ? 'ring-2 ring-muted'
                          : ''
                  } rounded-full p-0.5`}>
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="text-2xl bg-muted">{story.avatar}</AvatarFallback>
                    </Avatar>
                    {story.id === 0 && (
                      <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
                        <Icon name="Plus" size={12} className="text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-center max-w-[60px] truncate">{story.name}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      
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
                {msg.type === 'voice' ? (
                  <div
                    className={`
                      flex items-center gap-3 rounded-2xl px-4 py-2 min-w-[200px]
                      ${msg.isMine 
                        ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-br-sm' 
                        : 'bg-muted text-foreground rounded-bl-sm'
                      }
                    `}
                  >
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className={`h-8 w-8 rounded-full hover-scale ${msg.isMine ? 'bg-white/20 hover:bg-white/30' : 'bg-primary/20 hover:bg-primary/30'}`}
                    >
                      <Icon name="Play" size={16} />
                    </Button>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-white/60 rounded-full" style={{ width: '40%' }} />
                        </div>
                      </div>
                      <div className={`flex items-center justify-between text-xs ${msg.isMine ? 'opacity-80' : 'opacity-60'}`}>
                        <span>{msg.voiceDuration}</span>
                        <div className="flex items-center gap-1">
                          <span>{msg.time}</span>
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
                  </div>
                ) : msg.type === 'image' ? (
                  <div className={`max-w-[70%] animate-scale-in ${msg.isMine ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
                    <div className="rounded-2xl overflow-hidden border-2 border-primary/20 hover-scale cursor-pointer">
                      <img 
                        src={msg.imageUrl} 
                        alt="Shared image" 
                        className="w-full h-auto max-h-96 object-cover"
                      />
                    </div>
                    <div className={`flex items-center gap-1 justify-end mt-1 px-2 ${msg.isMine ? 'text-primary-foreground opacity-80' : 'text-muted-foreground'}`}>
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
                ) : msg.type === 'file' ? (
                  <div
                    className={`
                      flex items-center gap-3 rounded-2xl px-4 py-3 min-w-[250px] max-w-[70%] hover-scale cursor-pointer
                      ${msg.isMine 
                        ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-br-sm' 
                        : 'bg-muted text-foreground rounded-bl-sm'
                      }
                    `}
                  >
                    <div className={`p-3 rounded-xl ${msg.isMine ? 'bg-white/20' : 'bg-primary/20'}`}>
                      <Icon name={msg.fileIcon as any || 'File'} size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{msg.fileName}</p>
                      <div className={`flex items-center justify-between text-xs mt-1 ${msg.isMine ? 'opacity-80' : 'opacity-60'}`}>
                        <span>{msg.fileSize}</span>
                        <div className="flex items-center gap-1">
                          <span>{msg.time}</span>
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
                    <Icon name="Download" size={18} className="opacity-60" />
                  </div>
                ) : (
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
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
          {isRecording ? (
            <div className="flex items-center gap-3 animate-fade-in">
              <Button 
                size="icon" 
                variant="ghost"
                className="hover-scale text-destructive"
                onClick={handleStopRecording}
              >
                <Icon name="X" size={24} />
              </Button>
              
              <div className="flex-1 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                  <span className="text-sm font-mono">{formatTime(recordingTime)}</span>
                </div>
                <div className="flex-1 flex gap-1 items-center">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-primary/30 rounded-full animate-pulse"
                      style={{ 
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 50}ms`
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <Button 
                size="icon" 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover-scale"
                onClick={handleStopRecording}
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 relative">
              <div className="relative">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover-scale"
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                >
                  <Icon name="Paperclip" size={20} />
                </Button>
                
                {showAttachMenu && (
                  <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-2xl shadow-lg p-2 animate-scale-in">
                    <div className="flex flex-col gap-1 min-w-[180px]">
                      <Button 
                        variant="ghost" 
                        className="justify-start gap-3 hover:bg-muted"
                        onClick={() => setShowAttachMenu(false)}
                      >
                        <div className="p-2 rounded-full bg-accent/20">
                          <Icon name="Image" size={18} className="text-accent" />
                        </div>
                        <span className="text-sm">Фото</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start gap-3 hover:bg-muted"
                        onClick={() => setShowAttachMenu(false)}
                      >
                        <div className="p-2 rounded-full bg-primary/20">
                          <Icon name="File" size={18} className="text-primary" />
                        </div>
                        <span className="text-sm">Файл</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start gap-3 hover:bg-muted"
                        onClick={() => setShowAttachMenu(false)}
                      >
                        <div className="p-2 rounded-full bg-secondary/20">
                          <Icon name="MapPin" size={18} className="text-secondary" />
                        </div>
                        <span className="text-sm">Локация</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {messageText.trim() ? (
                <>
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
                </>
              ) : (
                <>
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
                    onMouseDown={handleStartRecording}
                    onTouchStart={handleStartRecording}
                  >
                    <Icon name="Mic" size={20} />
                  </Button>
                </>
              )}
            </div>
          )}
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
        {activeTab === 'chats' && renderChatsList()}
        {activeTab === 'groups' && renderGroupsList()}
        {activeTab === 'contacts' && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
            <Icon name="Users" size={64} className="mb-4 opacity-20" />
            <p className="text-lg text-center">Контакты в разработке</p>
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
            <Icon name="User" size={64} className="mb-4 opacity-20" />
            <p className="text-lg text-center">Профиль в разработке</p>
          </div>
        )}
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