import React, { useState } from 'react';
import {
  Calendar,
  Edit3,
  Image,
  Mic,
  Save,
  ArrowLeft,
  Mail,
  Clock,
  Tag,
  Plus,
  FileText,
  Send,
  X,
  Loader2,
  AlertCircle,
  CalendarIcon
} from 'lucide-react';
import { useLetters } from '../lib/useLetters';

interface DashboardProps {
  onClose: () => void;
}

const formatDate = (date: Date | string, format: string) => {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {};

  if (format.includes('MMMM')) {
    options.month = 'long';
  }
  if (format.includes('dd')) {
    options.day = '2-digit';
  }
  if (format.includes('yyyy')) {
    options.year = 'numeric';
  }
  if (format.includes('MMM')) {
    options.month = 'short';
  }

  return d.toLocaleDateString('en-US', options);
};

const SimpleCalendar: React.FC<{
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
}> = ({ value, onChange, minDate }) => {
  const currentMonth = value.getMonth();
  const currentYear = value.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isDisabled = minDate && date < minDate;
    const isSelected = date.toDateString() === value.toDateString();

    days.push(
      <button
        key={day}
        onClick={() => !isDisabled && onChange(date)}
        disabled={isDisabled}
        className={`p-2 text-sm rounded-lg transition-colors ${isSelected
          ? 'bg-purple-500 text-white'
          : isDisabled
            ? 'text-gray-300 cursor-not-allowed'
            : 'hover:bg-purple-100 text-gray-700'
          }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">
          {formatDate(value, 'MMMM yyyy')}
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'write' | 'letters'>('write');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [letterContent, setLetterContent] = useState('Dear Future Me,\n\n');
  const [letterTitle, setLetterTitle] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedReminders, setSelectedReminders] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const {
    letters,
    isLoading: lettersLoading,
    error: lettersError,
    createLetter,
    deleteLetter,
    clearError
  } = useLetters();

  const availableTags = ['Hope', 'Love', 'Goals', 'Reminder', 'Gratitude', 'Dreams', 'Reflection'];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceRecord = () => {
    setHasVoiceNote(!hasVoiceNote);
  };

  const handleSaveLetter = () => {
    if (!letterTitle.trim()) {
      alert('Please enter a title for your letter');
      return;
    }
    if (!letterContent.trim() || letterContent.trim() === 'Dear Future Me,') {
      alert('Please write some content for your letter');
      return;
    }
    if (selectedDate <= new Date()) {
      alert('Please select a future delivery date');
      return;
    }

    setShowReminderModal(true);
  };

  const handleConfirmSave = async () => {
    try {
      setIsSaving(true);
      clearError();

      const letterData = {
        title: letterTitle.trim(),
        content: letterContent,
        deliveryDate: selectedDate.toISOString(),
        reminders: selectedReminders,
        tags: selectedTags,
        hasImage: !!uploadedImage,
        hasVoice: hasVoiceNote,
        imageUrl: uploadedImage || undefined,
      };

      const newLetter = await createLetter(letterData);

      if (newLetter) {
        setShowReminderModal(false);
        setLetterTitle('');
        setLetterContent('Dear Future Me,\n\n');
        setUploadedImage(null);
        setHasVoiceNote(false);
        setSelectedTags([]);
        setSelectedDate(new Date());
        setSelectedReminders(1);

        setActiveTab('letters');
      }
    } catch (error) {
      console.error('Error saving letter:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLetter = async (letterId: string) => {
    if (window.confirm('Are you sure you want to delete this letter?')) {
      await deleteLetter(letterId);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50 z-50 overflow-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">My Letters Dashboard</h1>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab('write')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'write'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-purple-600'
                  }`}
              >
                <Edit3 size={16} className="inline mr-2" />
                Write Letter
              </button>
              <button
                onClick={() => setActiveTab('letters')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'letters'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-purple-600'
                  }`}
              >
                <Mail size={16} className="inline mr-2" />
                My Letters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {activeTab === 'write' ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Write Your Letter</h2>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Date & Settings */}
                <div className="space-y-6">
                  {/* Delivery Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <CalendarIcon size={16} className="inline mr-2" />
                      Delivery Date
                    </label>
                    <button
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="w-full bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-2xl text-left hover:from-purple-200 hover:to-pink-200 transition-all"
                    >
                      <div className="font-medium text-gray-800">
                        {formatDate(selectedDate, 'MMMM dd, yyyy')}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Click to change date
                      </div>
                    </button>

                    {showCalendar && (
                      <div className="mt-4 bg-white rounded-2xl shadow-lg">
                        <SimpleCalendar
                          value={selectedDate}
                          onChange={(date) => {
                            setSelectedDate(date);
                            setShowCalendar(false);
                          }}
                          minDate={new Date()}
                        />
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Tag size={16} className="inline mr-2" />
                      Letter Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedTags.includes(tag)
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                            }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Attachments */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Attachments
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                        <Image size={20} className="text-gray-600" />
                        <span className="text-sm text-gray-700">Add Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={handleVoiceRecord}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-colors w-full ${hasVoiceNote
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                          }`}
                      >
                        <Mic size={20} />
                        <span className="text-sm">
                          {hasVoiceNote ? 'Voice Note Added' : 'Add Voice Note'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Letter Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Letter Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <FileText size={16} className="inline mr-2" />
                      Letter Title
                    </label>
                    <input
                      type="text"
                      value={letterTitle}
                      onChange={(e) => setLetterTitle(e.target.value)}
                      placeholder="Give your letter a meaningful title..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      maxLength={200}
                    />
                  </div>

                  {/* Letter Content */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Edit3 size={16} className="inline mr-2" />
                      Your Letter
                    </label>

                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      <textarea
                        value={letterContent}
                        onChange={(e) => setLetterContent(e.target.value)}
                        placeholder="Dear Future Me..."
                        className="w-full h-80 p-4 border-none focus:ring-2 focus:ring-purple-500 resize-none"
                      />
                    </div>
                  </div>

                  {/* Image Preview */}
                  {uploadedImage && (
                    <div className="mt-4 relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="max-w-full h-48 object-cover rounded-2xl"
                      />
                      <button
                        onClick={() => setUploadedImage(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  {/* Save Button */}
                  <button
                    onClick={handleSaveLetter}
                    className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <Save size={20} />
                    Save Letter
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* My Letters Tab */
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Letters</h2>

              {/* Error Message */}
              {lettersError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
                  <AlertCircle size={20} className="text-red-500" />
                  <div>
                    <p className="text-red-700 font-medium">Error loading letters</p>
                    <p className="text-red-600 text-sm">{lettersError}</p>
                  </div>
                  <button
                    onClick={clearError}
                    className="ml-auto text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Loading State */}
              {lettersLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 size={32} className="animate-spin text-purple-500" />
                  <span className="ml-3 text-gray-600">Loading your letters...</span>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {letters.map(letter => (
                    <div key={letter.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 text-lg">{letter.title}</h3>
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${letter.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-700'
                            : letter.status === 'DELIVERED'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                            }`}>
                            {letter.status.toLowerCase()}
                          </div>
                          <button
                            onClick={() => handleDeleteLetter(letter.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete letter"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {letter.content.replace(/<[^>]*>/g, '')} {/* Strip HTML tags for preview */}
                      </p>

                      <div className="flex items-center gap-2 mb-4">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500">
                          Delivers on {formatDate(new Date(letter.deliveryDate), 'MMM dd, yyyy')}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {letter.tags.map(tag => (
                          <span key={tag} className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {letter.hasImage && <Image size={16} className="text-gray-400" />}
                          {letter.hasVoice && <Mic size={16} className="text-gray-400" />}
                          <span className="text-xs text-gray-500">{letter.reminders} reminders</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Created {formatDate(new Date(letter.createdAt), 'MMM dd')}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Empty State */}
                  {!lettersLoading && letters.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <Mail size={48} className="text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No letters yet</h3>
                      <p className="text-gray-500 mb-6">Start writing your first letter to your future self!</p>
                      <button
                        onClick={() => setActiveTab('write')}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl font-medium transition-colors"
                      >
                        Write Your First Letter
                      </button>
                    </div>
                  )}

                  {/* Add New Letter Card */}
                  <div
                    onClick={() => setActiveTab('write')}
                    className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-dashed border-purple-300 flex flex-col items-center justify-center text-center h-64"
                  >
                    <Plus size={48} className="text-purple-400 mb-4" />
                    <h3 className="font-semibold text-gray-700 mb-2">Write New Letter</h3>
                    <p className="text-gray-500 text-sm">Create another letter to your future self</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              How many reminders?
            </h3>
            <p className="text-gray-600 text-center mb-8">
              We'll send you gentle email reminders before your letter arrives
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map(num => (
                <button
                  key={num}
                  onClick={() => setSelectedReminders(num)}
                  className={`p-4 rounded-2xl text-center transition-all ${selectedReminders === num
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                    }`}
                >
                  <div className="text-2xl font-bold">{num}</div>
                  <div className="text-sm">reminder{num > 1 ? 's' : ''}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowReminderModal(false)}
                className="flex-1 py-3 px-6 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                disabled={isSaving}
                className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Save Letter
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;